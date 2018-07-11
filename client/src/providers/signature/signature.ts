import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { not_impl } from '@beenotung/tslib/error';
import { repeatI } from '@beenotung/tslib/lang';
import { Random } from '@beenotung/tslib/random';
import { signature, transactionId } from 'spec';
import { config } from '../../config';

/*
  Generated class for the SignatureProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SignatureProvider {
  constructor (public http: HttpClient) {
    console.log('Hello SignatureProvider Provider');
  }

  public sign (SignerUserId: transactionId): signature {
    if (config.mockClient) {
      return {
        SignerUserId,
        Method: 'sha256',
        Signature: this.mockSignatureBytes(),
      };
    }
    return not_impl();
  }

  /**
   * in format of bytes of sha256
   * */
  public mockSignatureBytes (): number[] {
    return repeatI(() => Random.nextInt(256, 0), 32);
  }
}
