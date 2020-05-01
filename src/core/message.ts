import {Contact} from "./contact";

export class Message {
    private timestamp: Date;
    private message: string;
    private author: Contact | undefined;
    private _encryptedMessage: string | undefined;

    constructor(timestamp: Date, message: string) {
        this.timestamp = timestamp;
        this.message = message;
    }


    get encryptedMessage(): string | undefined{
        return this._encryptedMessage;
    }

    private encrypt() {
        this._encryptedMessage = "";
    }
}
