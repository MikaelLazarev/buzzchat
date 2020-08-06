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
import {Message, MessageFull, MessagesRepositoryI} from '../core/message';
import {
  Profile,
  profile2Contact,
  ProfilesRepositoryI,
  ProfilesServiceI,
} from '../core/profiles';
import {SocketUpdate} from '../core/operations';
import {Contact} from '../core/contact';
import {SocketPusher} from "../core/socket";

@injectable()
export class ChatsService implements ChatsServiceI {
  private _repository: ChatsRepositoryI;
  private _messagesRepository: MessagesRepositoryI;
  private _profilesRepository: ProfilesRepositoryI;
  private _profilesService: ProfilesServiceI;
  private _pusher : SocketPusher;

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
  }

  setPusher(pusher: SocketPusher): void {
    this._pusher = pusher;
  }

  async findById(user_id: string, chat_id: string): Promise<ChatFull> {
    const chat = await this._repository.findById(chat_id);
    if (!chat) throw 'Chat not found';

    const isUserInChat: boolean = chat?.members.indexOf(user_id) !== -1;
    if (!isUserInChat) throw 'User is not member of this chat';

    const messages = await this.getFullMessages(
      this._messagesRepository.list(chat_id),
    );
    const members: Contact[] = [];

    for (let memberId of chat.members) {
      const member = await this._profilesRepository.findOne(memberId);
      if (member) members.push(profile2Contact(member));
    }

    return {
      ...chat,
      members,
      messages,
    };
  }

  async postMessage(user_id: string, dto: PostMessageDTO): Promise<void> {
    const chat = await this._repository.findById(dto.chatId);
    if (!chat) throw 'Chat not found';

    const isUserInChat: boolean = chat?.members.indexOf(user_id) !== -1;
    if (!isUserInChat) throw 'User is not member of this chat';

    for (let memberId of chat.members) {
      if (memberId !== user_id) {
        // Copy message instance instead setting link to it!
        const messages = [{...dto.msg}]
        this._pusher.pushPendingQueue({
          userId: memberId,
          event: 'chat:pendingMessage',
          handler: async () => ({
            id: dto.chatId,
            messages,
          }),
        });
      }
    }

    dto.msg.pending = false;

    await this._messagesRepository.addMessage(dto.chatId, dto.msg);

    for (let memberId of chat.members) {
      this._pusher.pushUpdateQueue({
        userId: memberId,
        event: 'chat:updateDetails',
        handler: async () => await this.findById(memberId, dto.chatId),
      });
    }
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

    if (message.userId !== user_id)
      throw 'Only owners could delete their messages';

    // Delete message
    await this._messagesRepository.deleteMessage(dto.chatId, dto.msgId);

    // Sending updates all chat members
    for (let memberId of chat.members) {
      this._pusher.pushUpdateQueue({
        userId: memberId,
        event: 'chat:updateDetails',
        handler: async () => this.findById(memberId, dto.chatId),
      });
    }
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

    const members: Array<Profile> = [];

    // Get members profiles
    for (let memId = 0; memId < dto.members.length; memId++) {
      const currentMember = await this._profilesRepository.findOne(
        dto.members[memId],
      );
      if (currentMember === undefined) {
        throw 'Members not found';
      }
      members.push(currentMember);
    }

    // Creating and storing chat
    const newChat: Chat = {
      id: dto.id,
      name: `${members[0]?.name} with ${members[1]?.name}`,
      members: dto.members,
      isTetATetChat: dto.isTetATetChat,
    };
    await this._repository.create(newChat);

    for (let chatmember of members) {
      // Adding chat to chatlist in each profile
      chatmember.chatsIdList = chatmember.chatsIdList || [];
      chatmember.chatsIdList.push(newChat.id);
      await this._profilesRepository.update(chatmember.id, chatmember);

      // Sending updates
      if (chatmember.id !== user_id) {
        this._pusher.pushUpdateQueue({
          userId: chatmember.id,
          event: 'profile:updateDetails',
          handler: async () =>
              await this._profilesService.getProfile(chatmember.id),
        });
      }
    }

    return {
      ...newChat,
      members: [profile2Contact(members[0]), profile2Contact(members[1])],
      messages: [],
    };
  }

  async getFullMessages(
    messages: Promise<Message[] | undefined>,
  ): Promise<MessageFull[]> {
    const result: MessageFull[] = [];
    const msgs = await messages;
    if (msgs === undefined) return [];

    for (const msg of msgs) {
      if (msg.user !== undefined && msg.user.id !== undefined) {
        msg.userId = msg.user.id;
      }
      result.push({
        id: msg.id,
        text: msg.text,
        createdAt: msg.createdAt,
        user: await this._profilesRepository.findOneContact(msg.userId),
        pending: false,
      });
    }
    return result;
  }
}
