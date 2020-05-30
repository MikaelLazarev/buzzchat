import {
  Chat, ChatFull,
  ChatsRepositoryI,
  ChatsServiceI, PostMessageDTO,
} from "../core/chat";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
// @ts-ignore
import { TimelineStream } from "scrape-twitter";
import {MessagesRepositoryI} from "../core/message";

@injectable()
export class ChatsService implements ChatsServiceI {
  private _repository: ChatsRepositoryI;
  private _messagesRepository: MessagesRepositoryI;

  public constructor(
    @inject(TYPES.ChatsRepository) repository: ChatsRepositoryI,
    @inject(TYPES.MessagesRepository) messagesRepository: MessagesRepositoryI
  ) {
    this._repository = repository;
    this._messagesRepository = messagesRepository;
  }

  async findById(user_id: string, chat_id: string): Promise<ChatFull> {
    const chat = await this.getUserChat(user_id, chat_id);
    const messages = await this._messagesRepository.list(chat_id);
    return {
      ...chat,
      messages: messages || [],
    }
  }

  async postMessage(user_id: string, dto: PostMessageDTO): Promise<void> {

    await this.getUserChat(user_id, dto.chat_id);
    return this._messagesRepository.addMessage(dto.chat_id, dto.msg);
  }


  list(): Promise<Chat[] | undefined> {
    return Promise.resolve(undefined);
  }

  private async getUserChat(user_id: string, chat_id: string) : Promise<Chat> {
    const chat = await this._repository.findById(chat_id);
    if (chat===undefined) throw 'Chat not found'

    const isUserInChat : boolean = chat?.members.indexOf(user_id) === -1;
    if (!isUserInChat) throw "User is not member of this chat";
    return chat;
  }


}
