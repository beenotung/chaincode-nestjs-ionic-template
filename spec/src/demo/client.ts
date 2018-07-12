import {group, keyPair, transactionId, user} from './data';

export abstract class WelcomePage {
    abstract login(UserKeyPair: keyPair): void;

    abstract createUser(User: user): void;

    abstract createGroup(Group: group): void;

    // throws Duplicated if already in group
    abstract joinGroup(GroupId: transactionId, User: user): void;

    // throws NotFound if not in group
    abstract quitGroup(GroupId: transactionId, User: user): void;
}

// other Pages are just wrapper for the server api
