import {dataContainer, GroupSeq, newDataContainer, UserSeq} from "./shared";
import {byteSeq, pubKey, transactionId} from "./data";

export abstract class GeneralContract {
    abstract create(NewDataContainer: newDataContainer): void;

    abstract update(DataContainer: dataContainer): void;

    abstract read(TxId: transactionId): dataContainer;
}

// for group and user
export abstract class UserContract extends GeneralContract {
    abstract searchGroupByName(GroupName: string): GroupSeq;

    // raises NotFound when the Group doesn't exist
    abstract searchUserByGroup(GroupId: transactionId, UserName: string): UserSeq;

    abstract getUserPublicKey(UserId: transactionId): pubKey;

    abstract varifySignature(Hash: byteSeq, UserId: transactionId): boolean; // return true if valid, false if not.
}
