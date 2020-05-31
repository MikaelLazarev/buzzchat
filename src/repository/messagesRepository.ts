import {injectable} from 'inversify';
import {BluzelleHelper} from './bluzelleHelper';
import {Message, MessagesRepositoryI} from '../core/message';

@injectable()
export class MessagesRepository implements MessagesRepositoryI {

  async list(id: string): Promise<Message[] | undefined> {
    const bluAPI = new BluzelleHelper<Message>(id);
    return  await bluAPI.list();
  }

  async addMessage(id: string, message: Message): Promise<Message[] | undefined>  {
    const messages = await this.list(id) || [];
    const bluAPI = new BluzelleHelper<Message>(id);
    const newId = await bluAPI.create(message.id, message);
    if (!newId) throw "Cant add new message to DB!";
    message.id = newId;
    messages.push(message);
    return messages;

  }
}
