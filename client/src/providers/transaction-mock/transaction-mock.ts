import { Injectable } from '@angular/core';
import { transactionId } from 'spec';

const hexs = '0123456789ABCDEF'.split('');

function genHex () {
  return hexs[Math.round(Math.random() * 15)];
}

function genTransactionId (): transactionId {
  let res = '';
  for (let i = 0; i < 64; i++) {
    res += genHex();
  }
  return res;
}

@Injectable()
export class TransactionMockProvider {
  private txIds = new Set<transactionId>();

  constructor () {
    console.log('Hello TransactionMockProvider Provider');
  }

  /**
   * format in hex of sha256
   * */
  public mockTransactionId (): transactionId {
    for (;;) {
      const res = genTransactionId();
      if (this.txIds.has(res)) {
        continue;
      }
      this.txIds.add(res);
      return res;
    }
  }
}
