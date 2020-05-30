import {Chat, ChatsRepositoryI} from '../core/chat';
import {BluzelleHelper} from './bluzelleHelper';
import {injectable} from 'inversify';
import config from '../config/config';

@injectable()
export class ChatsRepository implements ChatsRepositoryI {
  private _blu: BluzelleHelper<Chat>;

  constructor() {
    this._blu = new BluzelleHelper<Chat>(config.mainDB);
  }

  findById(id: string): Promise<Chat | undefined> {
    return this._blu.findOne(id);
  }

  update(user_id: string, newChat: Chat): Promise<void> {
    return this._blu.update(user_id, newChat);
  }

  async create(newChat: Chat): Promise<Chat | undefined> {
    const existingAcc = await this._blu.findOne(newChat.id);

    if (existingAcc !== undefined) {
      return existingAcc;
    }

    await this._blu.create(newChat.id, newChat);
    return newChat;
  }

  list(): Promise<Chat[] | undefined> {
    return this._blu.list();
  }


}
