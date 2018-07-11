import { Injectable } from '@nestjs/common';
import {TransactionHandler} from 'spec/dist/demo/server';
import {dataContainer, newDataContainer} from 'spec/dist/demo/shared';
import {not_impl} from '../utils';
import {expire, transactionId} from 'spec/dist/demo/data';

@Injectable()
export class TransactionService implements TransactionHandler{
  createTransaction(NewDataContainer: newDataContainer): void {
    not_impl()
  }

  updateTransaction(DataContainer: dataContainer): void {
    not_impl()
  }

  getData(TxId: transactionId): dataContainer {
    return not_impl();
  }

  expireDate(Expire: expire): void {
    not_impl()
  }
}
