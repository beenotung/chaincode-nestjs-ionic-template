import {block, dataContainer, GroupSeq, newDataContainer, UserSeq} from './shared';
import {expire, multihash, pubKey, transactionId} from './data';

export type StringSeq = Array<string>;
export type BlockSeq = Array<block>;

// route: /transaction
export abstract class TransactionHandler {

    // POST: /create
    abstract createTransaction(NewDataContainer: newDataContainer): void;

    // POST: /update
    abstract updateTransaction(DataContainer: dataContainer): void;

    // GET: /get/:TxId
    abstract getData(TxId: transactionId): dataContainer;

    // POST: /expire
    abstract expireData(Expire: expire): void;
}

// route: /user
export abstract class UserHandler {

    // GET: /searchGroupByName/:GroupName
    abstract searchGroupByName(GroupName: string): GroupSeq;

    // raises NotFound when the Group doesn't exist
    // GET: /searchUserByGroup/:GroupId/:UserName
    abstract searchUserByGroup(GroupId: transactionId, UserName: string): UserSeq;

    // GET: /getUserPublicKey/:UserId
    abstract getUserPublicKey(UserId: transactionId): pubKey;

    // GET: /verifySignature/:Hash/UserId
    // return true if valid, false if not.
    abstract verifySignature(Hash: multihash, UserId: transactionId): boolean;
}

// route: /block
export abstract class BlockHandler {

    // GET: /show/:Height
    abstract showBlock(Height: number): block;

    // GET: /showAll
    abstract showBlocks(): BlockSeq;

    // GET: /height
    abstract getHeight(): number;
}
