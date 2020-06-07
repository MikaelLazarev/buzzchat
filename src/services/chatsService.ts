/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {
  Chat,
  ChatCreateDTO,
  ChatFull,
  ChatsRepositoryI,
  ChatsServiceI,
  DeleteMessageDTO,
  PostMessageDTO,
} from '../core/chat';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import {MessagesRepositoryI} from '../core/message';
import {
  profile2Contact,
  ProfilesRepositoryI,
  ProfilesServiceI,
} from '../core/profiles';
import {SocketUpdate} from '../core/operations';
import {Contact} from '../core/contact';

@injectable()
export class ChatsService implements ChatsServiceI {
  private _repository: ChatsRepositoryI;
  private _messagesRepository: MessagesRepositoryI;
  private _profilesRepository: ProfilesRepositoryI;
  private _profilesService: ProfilesServiceI;
  private _updateQueue: SocketUpdate[];

  public constructor(
    @inject(TYPES.ChatsRepository) repository: ChatsRepositoryI,
    @inject(TYPES.ProfilesRepository) profilesRepository: ProfilesRepositoryI,
    @inject(TYPES.ProfilesService) profilesService: ProfilesServiceI,
    @inject(TYPES.MessagesRepository) messagesRepository: MessagesRepositoryI,
  ) {
    this._repository = repository;
    this._messagesRepository = messagesRepository;
    this._profilesRepository = profilesRepository;
    this._profilesService = profilesService;
    this._updateQueue = [];
  }

  async findById(user_id: string, chat_id: string): Promise<ChatFull> {
    const chat = await this._repository.findById(chat_id);
    if (!chat) throw 'Chat not found';

    console.log(user_id, chat);

    const isUserInChat: boolean = chat?.members.indexOf(user_id) !== -1;
    if (!isUserInChat) throw 'User is not member of this chat';

    const messages = await this._messagesRepository.list(chat_id);
    const members: Contact[] = [];

    for (let memberId of chat.members) {
      const member = await this._profilesRepository.findOne(memberId);
      if (member) members.push(profile2Contact(member));
    }

    return {
      ...chat,
      members,
      messages: messages || [],
    };
  }

  async postMessage(user_id: string, dto: PostMessageDTO): Promise<ChatFull> {
    const chat = await this._repository.findById(dto.chatId);
    if (!chat) throw 'Chat not found';

    const isUserInChat: boolean = chat?.members.indexOf(user_id) !== -1;
    if (!isUserInChat) throw 'User is not member of this chat';

    const members: Contact[] = [];

    for (let memberId of chat.members) {
      const member = await this._profilesRepository.findOne(memberId);
      if (member) members.push(profile2Contact(member));
    }

    dto.msg.pending = false;

    const chatFull: ChatFull = {
      ...chat,
      members,
      messages:
        (await this._messagesRepository.addMessage(dto.chatId, dto.msg)) || [],
    };

    members.forEach((m) =>
      this._updateQueue.push({
        userId: m.id,
        event: 'chat:updateDetails',
        payload: chatFull,
      }),
    );
    return chatFull;
  }

  async deleteMessage(user_id: string, dto: DeleteMessageDTO): Promise<void> {
    const chat = await this._repository.findById(dto.chatId);
    if (!chat) throw 'Chat not found';

    const isUserInChat: boolean = chat?.members.indexOf(user_id) !== -1;
    if (!isUserInChat) throw 'User is not member of this chat';

    const message = await this._messagesRepository.findById(
      dto.chatId,
      dto.msgId,
    );
    if (message === undefined) throw 'Message not found';

    if (message.user.id !== user_id)
      throw 'Only owners could delete their messages';

    const members: Contact[] = [];

    for (let memberId of chat.members) {
      const member = await this._profilesRepository.findOne(memberId);
      if (member) members.push(profile2Contact(member));
    }
    const chatFull: ChatFull = {
      ...chat,
      members,
      messages:
        (await this._messagesRepository.deleteMessage(dto.chatId, dto.msgId)) ||
        [],
    };

    members.forEach((m) =>
      this._updateQueue.push({
        userId: m.id,
        event: 'chat:updateDetails',
        payload: chatFull,
      }),
    );
  }

  async create(
    user_id: string,
    dto: ChatCreateDTO,
  ): Promise<ChatFull | undefined> {
    if (
      dto.members.length < 2 ||
      (dto.members[0] !== user_id && dto.members[1] !== user_id)
    ) {
      throw 'UserID not found in chat members!';
    }

    const member0 = await this._profilesRepository.findOne(dto.members[0]);
    const member1 = await this._profilesRepository.findOne(dto.members[1]);

    if (member0 === undefined || member1 === undefined) {
      throw 'Members not found';
    }

    const newChat: Chat = {
      id: dto.id,
      name: `${member0?.name} with ${member1?.name}`,
      members: dto.members,
      isTetATetChat: dto.isTetATetChat,
    };

    console.log('Creating new chat...');
    await this._repository.create(newChat);
    member0.chatsIdList = member0.chatsIdList || [];
    member1.chatsIdList = member1.chatsIdList || [];

    member0.chatsIdList.push(newChat.id);
    member1.chatsIdList.push(newChat.id);
    console.log('M0', member0);
    console.log('M1', member1);
    await this._profilesRepository.update(member0.id, member0);
    await this._profilesRepository.update(member1.id, member1);

    const profile0 = await this._profilesService.getProfile(member0.id);

    const profile1 = await this._profilesService.getProfile(member1.id);

    console.log(`0: ${this._updateQueue}`);
    this._updateQueue.push({
      userId: member0.id,
      event: 'profile:updateDetails',
      payload: profile0 as Object,
    });

    console.log(`1: ${this._updateQueue}`);

    this._updateQueue.push({
      userId: member1.id,
      event: 'profile:updateDetails',
      payload: profile1 as Object,
    });
    console.log(`2: ${this._updateQueue}`);
    return {
      ...newChat,
      members: [profile2Contact(member0), profile2Contact(member1)],
      messages: [],
    };
  }

  getUpdateQueue(): SocketUpdate[] {
    const copy = [...this._updateQueue];
    if (copy.length > 0) console.log('$1', copy);
    this._updateQueue = [];
    if (copy.length > 0) console.log('$2', copy);
    return copy;
  }
}
