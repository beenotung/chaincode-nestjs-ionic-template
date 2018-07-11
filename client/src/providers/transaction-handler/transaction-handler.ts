import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  dataContainer,
  expire,
  newDataContainer,
  TransactionHandler,
  transactionId,
} from 'spec';
import { Get, passToStub, Post, Route } from '../../utils/rest-stub';

/* tslint:disable no-empty */
@Route('transaction')
class TransactionHandlerStub implements TransactionHandler {
  @Post('/expire')
  public expireData (Expire: expire): void {}

  @Post('/create')
  public createTransaction (NewDataContainer: newDataContainer): void {}

  @Get('/update')
  public updateTransaction (DataContainer: dataContainer): void {}

  @Get('/get/:TxId')
  public getData (TxId: transactionId): dataContainer {
    return undefined;
  }

  @Post('/expire')
  public expireDate (Expire: expire): void {}
}

/* tslint:enable no-empty */

@Injectable()
export class TransactionHandlerProvider {
  public stub: TransactionHandler;

  constructor (public http: HttpClient) {
    console.log('Hello TransactionHandlerProvider Provider');
    this.stub = new TransactionHandlerStub();
  }

  public expireData (Expire: expire): Promise<void> {
    return passToStub(this, this.expireData, { Expire });
  }

  public createTransaction (NewDataContainer: newDataContainer): Promise<void> {
    return passToStub(this, this.createTransaction, { NewDataContainer });
  }

  public updateTransaction (DataContainer: dataContainer): Promise<void> {
    return passToStub(this, this.updateTransaction, { DataContainer });
  }

  public getData (TxId: string): Promise<dataContainer> {
    return passToStub(this, this.getData, { TxId });
  }

  public expireDate (Expire: expire): Promise<void> {
    return passToStub(this, this.expireDate, { Expire });
  }
}
