import {injectable} from 'inversify';
import {BluzelleHelper} from './bluzelleHelper';
import {Message, MessagesRepositoryI} from '../core/message';

@injectable()
export class MessagesRepository implements MessagesRepositoryI {
  async list(id: string): Promise<Message[] | undefined> {
    const bluAPI = new BluzelleHelper<Message>(id);
    return await bluAPI.list();
  }

  async addMessage(
    id: string,
    message: Message,
  ): Promise<Message[] | undefined> {
    const messages = (await this.list(id)) || [];
    const bluAPI = new BluzelleHelper<Message>(id);
    const newId = await bluAPI.create(message.id, message);
    if (!newId) throw 'Cant add new message to DB!';
    message.id = newId;
    messages.push(message);
    return messages;
  }

  async findById(
    chatId: string,
    messageId: string,
  ): Promise<Message | undefined> {
    const bluAPI = new BluzelleHelper<Message>(chatId);
    const message = await bluAPI.findOne(messageId);
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
}
