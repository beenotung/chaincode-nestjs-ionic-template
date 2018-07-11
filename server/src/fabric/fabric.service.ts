import {Injectable} from '@nestjs/common';
import {store_path} from "../utils";
import * as util from "util";

const Fabric_Client = require('fabric-client');


@Injectable()
export class FabricService {
  fabric_client: any;
  client: Promise<any>;
  readonly channelName = 'mychannel';
  channel: any;

  constructor() {
    this.fabric_client = new Fabric_Client();

    // setup the fabric network
    this.channel = this.fabric_client.newChannel(this.channelName);
    const peer = this.fabric_client.newPeer('grpc://localhost:7051');
    this.channel.addPeer(peer);
    const order = this.fabric_client.newOrderer('grpc://localhost:7050');
    this.channel.addOrderer(order);

    this.client = Fabric_Client.newDefaultKeyValueStore({
      path: store_path
    }).then((state_store) => {
      // console.log('state_store:', state_store);
      // assign the store to the fabric client
      this.fabric_client.setStateStore(state_store);
      const crypto_suite = Fabric_Client.newCryptoSuite();
      // use the same location for the state store (where the users' certificate are kept)
      // and the crypto store (where the users' keys are kept)
      const crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
      crypto_suite.setCryptoKeyStore(crypto_store);
      this.fabric_client.setCryptoSuite(crypto_suite);

      // get the enrolled user from persistence, this user will sign all requests
      return this.fabric_client.getUserContext('user1', true);
    });
  }

  async queryFunction(contractName, functionName, args) {
    await this.client;
    return this.channel.queryByChaincode({
      chaincodeId: contractName,
      txId: null,
      fcn: functionName,
      args
    })
  }

  async invokeFunction(contractName, functionName, args) {
    await this.client;
    const tx_id = this.fabric_client.newTransactionID();
    return this.channel.sendTransactionProposal({
      chaincodeId: contractName,
      fcn: functionName,
      args,
      chainId: this.channelName,
      txId: tx_id,
    }).then(results => {
      const proposalResponses = results[0];
      const proposal = results[1];
      let isProposalGood = false;
      if (proposalResponses && proposalResponses[0].response &&
        proposalResponses[0].response.status === 200) {
        isProposalGood = true;
        console.log('Transaction proposal was good');
      } else {
        console.error('Transaction proposal was bad');
      }
      if (isProposalGood) {
        console.log(util.format(
          'Successfully sent Proposal and received ProposalResponse: Status - %s, message - "%s"',
          proposalResponses[0].response.status, proposalResponses[0].response.message));

        // build up the request for the orderer to have the transaction committed
        const request = {
          proposalResponses: proposalResponses,
          proposal: proposal
        };

        // set the transaction listener and set a timeout of 30 sec
        // if the transaction did not get committed within the timeout period,
        // report a TIMEOUT status
        const transaction_id_string = tx_id.getTransactionID(); //Get the transaction ID string to be used by the event processing
        const promises = [];

        const sendPromise = this.channel.sendTransaction(request);
        promises.push(sendPromise); //we want the send transaction first, so that we know where to check status

        // get an eventhub once the fabric client has a user assigned. The user
        // is required bacause the event registration must be signed
        let event_hub = this.fabric_client.newEventHub();
        event_hub.setPeerAddr('grpc://localhost:7053');

        // using resolve the promise so that result status may be processed
        // under the then clause rather than having the catch clause process
        // the status
        let txPromise = new Promise((resolve, reject) => {
          let handle = setTimeout(() => {
            event_hub.disconnect();
            reject({event_status: 'TIMEOUT'}); //we could use reject(new Error('Transaction did not complete within 30 seconds'));
          }, 3000);
          event_hub.connect();
          event_hub.registerTxEvent(transaction_id_string, (tx, code) => {
            // this is the callback for transaction event status
            // first some clean up of event listener
            clearTimeout(handle);
            event_hub.unregisterTxEvent(transaction_id_string);
            event_hub.disconnect();

            // now let the application know what happened
            const return_status = {event_status: code, tx_id: transaction_id_string};
            if (code !== 'VALID') {
              console.error('The transaction was invalid, code = ' + code);
              reject(return_status); // we could use reject(new Error('Problem with the tranaction, event status ::'+code));
            } else {
              console.log('The transaction has been committed on peer ' + event_hub._ep._endpoint.addr);
              resolve(return_status);
            }
          }, (err) => {
            //this is the callback if something goes wrong with the event registration or processing
            reject(new Error('There was a problem with the eventhub ::' + err));
          });
        });
        promises.push(txPromise);

        return Promise.all(promises);
      } else {
        console.error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
        throw new Error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
      }
    })
  }

  async queryBlock(blockNumber: number) {
    await this.client;
    return this.channel.queryBlock(blockNumber)
  }

  async queryBlockByHash(blockHash) {
    await this.client;
    return this.channel.queryBlockByHash(blockHash)
  }
  
   async queryTransaction(tx_id:string) {
    await this.client;
    return this.channel.queryTransaction(tx_id)
  }
}
