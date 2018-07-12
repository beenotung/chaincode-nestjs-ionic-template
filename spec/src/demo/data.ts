export type transactionId = string;
// globally unique, transactionId + '-' + increment
export type id = string;
export type time = number;
export type byteSeq = Array<number>;

// https://github.com/multiformats/multihash
export type multihash = string;

// https://github.com/multiformats/multibase
// from text to binary explicitly, then to data implicitly
export type multibase = string;

// https://github.com/multiformats/multiaddr
export type multiaddr = string;

// https://github.com/multiformats/multicodec
// from binary to data explicitly
export type multicodec = Array<number>;

export interface signature {
    // links to public key
    SignerUserId: id;
    // e.g. RSA
    Method: string;
    Signature: Array<number>;
}

// public key
export interface pubKey {
    // e.g. RSA using modulus and public exponent, or PEM format
    Method: string;
    PubKey: Array<number>;
}

export interface keyPair {
    // e.g. RSA PEM
    Method: string;
    // PEM, json, base64 or any way specified by Method
    Content: multibase;
}

export interface expire {
    Id: id;
    // the object to be discarded
    TargetId: id;
    ExpireDate: time;
    Reason: string;
    Signature: signature;
}

export interface user {
    Id: id;
    // free text
    UserName: string;
    UserPubKey: pubKey;
    // self signed
    Signature: signature;
}

export interface group {
    Id: id;
    GroupName: string;
    GroupPubKey: pubKey;
    // user id of the founder
    CreatorId: id;
    // self signed by group
    Signature: signature;
}

export interface user_group {
    Id: id;
    GroupId: id;
    UserId: id;
    /*
    .Values of Action
    |===
    | code | meaning
    | 0x00 | join
    | 0x01 | quit
    |===
    */
    Action: number;
    // signed by user
    Signature: signature;
}

// only for join group
export interface endorse_user_group {
    Id: id;
    // transaction id of the user_group proposal
    UserGroupId: id;
    // user id of a group member
    Endorser: id;
    // signed by the endorser
    Signature: signature;
}
