import {date, group, multihash, transactionId, user} from "./data";

export type GroupSeq = Array<group>;
export type UserSeq = Array<user>;

export interface block {
    Height: number;
    Time: date;
    NumOfTx: number;
    Miner: string; // TODO confirm the data type
    PrevHash: multihash;
    BlockHash: multihash;
}

export interface dataContainer {
    /*
    .Values of Type
    | code | meaning

    | 0x01 | expire

    | 0x02 | user
    | 0x03 | group
    | 0x04 | user_group
    | 0x05 | endorse_user_group

    | 0x06 | meta
    | 0x07 | request
    | 0x08 | reply
    */
    Type: number;
    TxId: transactionId;
    Data: any;
}

// for creation
export interface newDataContainer {
    Type: number;
    Data: any;
}

export class NotFound extends Error {
}

export class Duplicated extends Error {
}

export class NetworkError extends Error {
}

export class OutOfSpace extends Error {
}

export enum AuthErrorType {ORG_AUTH_ERROR, DEPARTMENT_AUTH_ERROR, USER_AUTH_ERROR}

export enum AuthErrorReason {
    NOT_FOUND, INVALID // e.g. signature doesn't match
}

export class AuthError extends Error {
    Type: AuthErrorType;
    Reason: AuthErrorReason;
}
