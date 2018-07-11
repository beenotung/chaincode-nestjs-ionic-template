import { Injectable } from '@angular/core';
import { byteSeq, multihash } from 'spec';
import { sha256 } from 'typestub-sha256';

@Injectable()
export class HashProvider {
  constructor () {
    console.log('Hello HashProvider Provider');
  }

  public hashString (content: string): multihash {
    return {
      Method: 'sha256',
      Digest: sha256(content, { asBytes: true }),
    };
  }

  public hashObject (content): multihash {
    return this.hashString(JSON.stringify(content));
  }

  public hashBytes (content: byteSeq): multihash {
    let s = '';
    for (const code of content) {
      s += String.fromCodePoint(code);
    }
    return this.hashString(s);
  }
}
