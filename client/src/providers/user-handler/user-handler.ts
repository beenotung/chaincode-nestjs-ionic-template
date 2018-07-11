import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base64, pubKey, transactionId } from 'spec/dist/demo/data';
import { UserHandler } from 'spec/dist/demo/server';
import { GroupSeq, UserSeq } from 'spec/dist/demo/shared';
import { Get, passToStub, Route } from '../../utils/rest-stub';

@Route('user')
class UserHandlerImpl implements UserHandler {
  @Get('/searchGroupByName/:GroupName')
  public searchGroupByName (GroupName: string): GroupSeq {
    return undefined;
  }

  @Get('/searchUserByGroup/:GroupId/:UserName')
  public searchUserByGroup (GroupId: transactionId, UserName: string): UserSeq {
    return undefined;
  }

  @Get('/getUserPublicKey/:UserId')
  public getUserPublicKey (UserId: transactionId): pubKey {
    return undefined;
  }

  @Get('/verifySignature/:Hash/UserId')
  public verifySignature (Hash: base64, UserId: transactionId): boolean {
    return undefined;
  }
}

@Injectable()
export class UserHandlerProvider {
  public stub: UserHandler;

  constructor (public http: HttpClient) {
    console.log('Hello UserHandlerProvider Provider');
    this.stub = new UserHandlerImpl();
  }

  public searchGroupByName (GroupName: string): Promise<GroupSeq> {
    return passToStub(this, this.searchGroupByName, { GroupName });
  }

  public searchUserByGroup (
    GroupId: transactionId,
    UserName: string,
  ): Promise<UserSeq> {
    return passToStub(this, this.searchUserByGroup, { GroupId, UserName });
  }

  public getUserPublicKey (UserId: transactionId): Promise<pubKey> {
    return passToStub(this, this.getUserPublicKey, { UserId });
  }

  public verifySignature (
    Hash: base64,
    UserId: transactionId,
  ): Promise<boolean> {
    return passToStub(this, this.verifySignature, { Hash, UserId });
  }
}
