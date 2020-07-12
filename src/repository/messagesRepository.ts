/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import crypto, {Cipher, Decipher} from 'crypto';
import {injectable} from 'inversify';
import {BluzelleHelper} from './bluzelleHelper';
import {Message, MessageFull, MessagesRepositoryI} from '../core/message';
import config from '../config/config';

@injectable()
export class MessagesRepository implements MessagesRepositoryI {
  private readonly ALGORITHM = 'aes-256-cbc';
  private readonly _iv: Buffer;
  private readonly _key: Buffer;

  constructor() {
    const hash = config.cipher_hash;
    const password = config.cipher_key;

    const iv = crypto.createHash('sha256').update(hash).digest();

    this._iv = Buffer.alloc(16, iv.toString('hex').slice(0, 16), 'binary');
    this._key = crypto.createHash('sha256').update(password).digest();

    console.log(this.decrypt(this.encrypt('Encryption works well')));
  }

  async list(id: string): Promise<Message[] | undefined> {
    const bluAPI = new BluzelleHelper<Message>(id);
    const msgs = await bluAPI.list();
    return msgs === undefined ? undefined : this.decryptMessages(msgs);
  }

  async addMessage(
    id: string,
    messageFull: MessageFull,
  ): Promise<Message[] | undefined> {
    const bluAPI = new BluzelleHelper<Message>(id);
    const message = this.MessageFromMessageFull(messageFull);
    const encryptedMessage : Message = {
      ...message,
      text: this.encrypt(message.text),
      };
    const newId = await bluAPI.create(message.id, encryptedMessage);
    if (!newId) throw 'Cant add new message to DB!';
    message.id = newId;
    return(await this.list(id)) || [];
  }

  async findById(
    chatId: string,
    messageId: string,
  ): Promise<Message | undefined> {
    const bluAPI = new BluzelleHelper<Message>(chatId);
    const message = await bluAPI.findOne(messageId);
    if (message === undefined) return undefined;
    message.text = this.decrypt(message.text);
    return message;
  }

  async deleteMessage(
    chatId: string,
    messageId: string,
  ): Promise<Message[] | undefined> {
    const messages = (await this.list(chatId)) || [];
    const bluAPI = new BluzelleHelper<Message>(chatId);
    const newId = await bluAPI.delete(messageId);
    return messages.filter((msg) => msg.id !== messageId);
  }

  encrypt(text: string) {
    const cipher = crypto.createCipheriv(this.ALGORITHM, this._key, this._iv);

    return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
  }

  decrypt(text: string) {
    const decipher = crypto.createDecipheriv(
      this.ALGORITHM,
      this._key,
      this._iv,
    );

    return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
  }

  decryptMessages(msgs: Message[]): Message[] {
    console.log(msgs);
    return msgs.map((msg) => {
      try {
        msg.text = this.decrypt(msg.text);
      } catch (e) {
        msg.text = 'Unable to decrypt: ' + msg.text;
      }

      return msg;
    });
  }

  private MessageFromMessageFull(message: MessageFull) : Message{
    if (message.user === undefined) throw "Cant add message without author";
    return {
      id: message.id,
      text: message.text,
      createdAt: message.createdAt,
      userId: message.user.id,
    }
  }
}
