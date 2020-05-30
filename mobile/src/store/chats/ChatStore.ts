import {LinkedMessage, Message} from '../../core/message';
import {Bluzelle} from '../../utils/getBluzelle';
import {v4 as uuid} from 'uuid';
import {Chat} from '../../core/chat';
import {Contact} from '../../core/contact';
import {MessageChain} from './MessageChain';

export class ChatStore {
  private _address: string;
  private bluzelle: Bluzelle;
  private myMessages: MessageChain;
  private members: Contact[];
  private messages: MessageChain[];

  constructor() {}

  public toChat(): Chat {
    return {
      id: '0',
      name: '1',
      members: [],
      messages: [],
    };
  }
}
