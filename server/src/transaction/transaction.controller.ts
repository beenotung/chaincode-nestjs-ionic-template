import {Body, Controller, Get, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {dataContainer, newDataContainer} from 'spec/dist/demo/shared';
import {expire, transactionId} from 'spec/dist/demo/data';
import {format, not_impl, ok} from '../utils';
import {FabricService} from "../fabric/fabric.service";

@Controller('transaction')
export class TransactionController {
  constructor(public fabricService: FabricService) {
  }

  @Post('/create')
  createTransaction(@Res() res, @Body() body: newDataContainer) {
    // res.status(HttpStatus.NOT_IMPLEMENTED).json('not impl');
    not_impl(res)
  }

  @Post('/update')
  updateTransaction(@Res() res, @Body() body: dataContainer) {
    // res.status(HttpStatus.NOT_IMPLEMENTED).json('not impl');
    not_impl(res);
  }

  @Get('/get/:TxId')
  async getData(@Res() res, @Param('TxId') TxId: transactionId) {
    // let result: dataContainer = not_impl(res);
    let dataContainer: dataContainer = await this.fabricService.queryFunction(
      'GeneralContract',
      'read',
      [TxId],
    );
    ok(res, dataContainer);
  }

  @Post('/expire')
  expireData(@Res()res, @Body()body: expire) {
    // res.status(HttpStatus.NOT_IMPLEMENTED).json('not impl');
    not_impl(res)
  }

  /**@deprecated not used*/
  @Get('/show/:Tx_id')
  async showTransaction(@Res()res, @Param('Tx_id')Tx_id: string) {
    // let result: block = not_impl(res);

    console.log({Tx_id});
    let result = await this.fabricService.queryTransaction(Tx_id);
    let payload = result.transactionEnvelope.payload.data.actions[0].payload.chaincode_proposal_payload.input//.data//.toString()////A
    payload = payload.toString();
    // payload = payload.reduce((acc, c) => acc + String.fromCodePoint(c), '')
    result = format(result);
    res.status(HttpStatus.OK).json({
      result,
      payload
    })

  }
}
