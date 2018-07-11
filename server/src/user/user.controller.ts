import {Controller, Get, Param, Res} from '@nestjs/common';
import {GroupSeq, UserSeq} from 'spec/dist/demo/shared';
import {not_impl} from '../utils';
import {base64, pubKey, transactionId} from 'spec/dist/demo/data';

@Controller('user')
export class UserController {

  @Get('/searchGroupByName/:GroupName')
  searchGroupByName(@Res()res, @Param('GroupName') GroupName: string) {
    let result: GroupSeq = not_impl(res);
  }


  @Get('/searchUserByGroup/:GroupId/:UserName')
  searchUserByGroup(@Res()res, @Param('GroupId') GroupId: transactionId, @Param('UserName')UserName: string) {
    let result: UserSeq = not_impl(res)
  }

  @Get('/getUserPublicKey/:UserId')
  getUserPublicKey(@Res()res, @Param('UserId')UserId: transactionId) {
    let result: pubKey = not_impl(res);
  }

  // return true if valid, false if not.
  @Get('/verifySignature/:Hash/UserId')
  verifySignature(@Res()res, @Param('Hash')Hash: base64, @Param('UserId') UserId: transactionId) {
    let result: boolean = not_impl(res);
  }
}
