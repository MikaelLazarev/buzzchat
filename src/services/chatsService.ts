import {
  Chat,
  ChatCreateDTO,
  ChatFull,
  ChatsRepositoryI,
  ChatsServiceI,
  PostMessageDTO,
} from '../core/chat';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import {MessagesRepositoryI} from '../core/message';
import {profile2Contact, ProfilesRepositoryI} from '../core/profiles';
import {SocketUpdate} from '../core/operations';
import {Contact} from '../core/contact';

@injectable()
export class ChatsService implements ChatsServiceI {
  private _repository: ChatsRepositoryI;
  private _messagesRepository: MessagesRepositoryI;
  private _profilesRepository: ProfilesRepositoryI;
  private _updateQueue: SocketUpdate[];

  public constructor(
    @inject(TYPES.ChatsRepository) repository: ChatsRepositoryI,
    @inject(TYPES.ProfilesRepository) profilesRepository: ProfilesRepositoryI,
    @inject(TYPES.MessagesRepository) messagesRepository: MessagesRepositoryI,
  ) {
    this._repository = repository;
    this._messagesRepository = messagesRepository;
    this._profilesRepository = profilesRepository;
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
    const chat = await this._repository.findById(dto.chat_id);
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
        (await this._messagesRepository.addMessage(dto.chat_id, dto.msg)) || [],
    };

    members
      .filter((m) => m.id !== user_id)
      .forEach((m) =>
        this._updateQueue.push({
          userId: m.id,
          event: 'chat:updateDetails',
          payload: chatFull,
        }),
      );
    console.log('JOJOJOJOJO');
    return chatFull;
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
      name: 'New chat ' + member0?.name + member1?.name,
      members: dto.members,
      isTetATetChat: dto.isTetATetChat,
    };

    console.log('Creating new chat...');
    await this._repository.create(newChat);
    member0.chatsIdList.push(newChat.id);
    member1.chatsIdList.push(newChat.id);
    console.log(member0);
    console.log(member1);
    await this._profilesRepository.update(member0.id, member0);
    await this._profilesRepository.update(member1.id, member1);

    this._updateQueue.push({
      userId: member0.id,
      event: 'profile:updateDetails',
      payload: (await this._profilesRepository.findOneFull(
        member0.id,
      )) as Object,
    });

    this._updateQueue.push({
      userId: member1.id,
      event: 'profile:updateDetails',
      payload: (await this._profilesRepository.findOneFull(
        member1.id,
      )) as Object,
    });

    return {
      ...newChat,
      members: [profile2Contact(member0), profile2Contact(member1)],
      messages: [],
    };
  }

  getUpdateQueue(): SocketUpdate[] {
    const copy = this._updateQueue;
    this._updateQueue = [];
    return copy;
  }
}
