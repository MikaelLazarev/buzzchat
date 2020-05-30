import {LinkedMessage, Message} from '../../core/message';
import {Bluzelle} from '../../utils/getBluzelle';
import {v4 as uuid} from 'uuid';

export class MessageChain {
  private _address: string;
  private bluzelle: Bluzelle;
  private messages: LinkedMessage[];
  private zeroMessageId: string;
  private nextMessageId: string;

  constructor(address: string, zeroMessageId: string) {
    this._address = address;
    this.bluzelle = new Bluzelle(address);
    this.messages = [];
    this.zeroMessageId = zeroMessageId;
    this.nextMessageId = zeroMessageId;
  }

  public readChain(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        while (true) {
          const nextMessage: LinkedMessage = JSON.parse(
            await this.bluzelle.read(this.nextMessageId),
          );
          if (nextMessage.nextId === '') {
            break;
          }

          this.messages.push(nextMessage);
          this.nextMessageId = nextMessage.nextId;
        }
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  public addMessage(message: Message): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const tailMessageId = uuid();
        const tailMessage: LinkedMessage = {
          message: null,
          nextId: '',
        };

        const newMessage: LinkedMessage = {
          message,
          nextId: tailMessageId,
        };

        await this.bluzelle.create(tailMessageId, JSON.stringify(tailMessage));
        await this.bluzelle.update(
          this.nextMessageId,
          JSON.stringify(newMessage),
        );

        this.nextMessageId = tailMessageId;
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
}
