import { Injectable } from '@nestjs/common';
import {UserHandler} from 'spec/dist/demo/server';
import {GroupSeq, UserSeq} from 'spec/dist/demo/shared';
import {byteSeq, pubKey, transactionId} from 'spec/dist/demo/data';
import {not_impl} from '../utils';

@Injectable()
export class UserService implements UserHandler{
  searchGroupByName(GroupName: string): GroupSeq {
    return not_impl();
  }

  searchUserByGroup(GroupId: transactionId, UserName: string): UserSeq {
    return not_impl();
  }

  getUserPublicKey(UserId: transactionId): pubKey {
    return not_impl();
  }

  verifySignature(Hash: byteSeq, UserId: transactionId): boolean {
    return not_impl();
  }
}
