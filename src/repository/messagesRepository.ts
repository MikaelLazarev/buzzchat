import {injectable} from 'inversify';
import {BluzelleHelper} from './bluzelleHelper';
import {Message, MessagesRepositoryI} from '../core/message';

@injectable()
export class MessagesRepository implements MessagesRepositoryI {

  async list(id: string): Promise<Message[] | undefined> {
    const bluAPI = new BluzelleHelper<Message>(id);
    return  await bluAPI.list();
  }

  async addMessage(id: string, message: Message): Promise<void> {
    const bluAPI = new BluzelleHelper<Message>(id);
    await bluAPI.create(id, message);
  }
}
