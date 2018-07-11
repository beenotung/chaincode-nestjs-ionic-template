export type transactionId = string;
export type date = number; // like long in Java
export type byteSeq = Array<number>;
export type base64 = string;

// to be used inline
export interface multihash {
    Method: string; // e.g. SHA256
    Digest: Array<number>; // byte array
}

export interface signature {
    SignerUserId: transactionId; // links to public key
    Method: string; // e.g. RSA
    Signature: Array<number>;
}

// public key
export interface pubKey {
    Method: string; // e.g. RSA using modulus and public exponent, or PEM format
    PubKey: Array<number>;
}

export interface keyPair {
    Method: string;  // e.g. RSA PEM
    Content: string; // PEM, json, base64 or any way specified by Method
}

export interface expire {
    TxId: transactionId;
    ExpireDate: date;
    Reason: string;
    Signature: signature;
}

export interface user {
    TxId: transactionId;
    UserName: string;    // free text
    UserPubKey: pubKey;
    Signature: signature; // self signed
}

export interface group {
    TxId: transactionId;
    GroupName: string;
    GroupPubKey: pubKey;
    CreatorId: transactionId; // user id of the founder
    Signature: signature; // self signed by group
}

export interface user_group {
    TxId: transactionId;
    GroupId: transactionId;
    UserId: transactionId;
    /*
    .Values of Action
    |===
    | code | meaning
    | 0x00 | join
    | 0x01 | quit
    |===
    */
    Action: number;
    Signature: signature; // signed by user
}

// only for join group
export interface endorse_user_group {
    TxId: transactionId;
    UserGroupId: transactionId; // transaction id of the user_group proposal
    Endorser: transactionId; // user id of a group member
    Signature: signature; // signed by the endorser
}
