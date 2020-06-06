import {
  DefaultProfile,
  Profile,
  ProfileFull,
  ProfilesRepositoryI,
  ProfilesServiceI,
  ProfileUpdateDTO,
} from '../core/profiles';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';
import {SocketUpdate} from '../core/operations';
import {ChatsRepositoryI} from '../core/chat';
import {BluzelleHelper} from '../repository/bluzelleHelper';
import {resolve} from 'inversify/dts/resolution/resolver';

@injectable()
export class ProfilesService implements ProfilesServiceI {
  private _repository: ProfilesRepositoryI;
  private _chatsRepository: ChatsRepositoryI;
  private _updateQueue: SocketUpdate[];
  private _profileInProgress: Set<string>;

  public constructor(
    @inject(TYPES.ProfilesRepository) repository: ProfilesRepositoryI,
    @inject(TYPES.ChatsRepository) chatsRepository: ChatsRepositoryI,
  ) {
    this._repository = repository;
    this._chatsRepository = chatsRepository;
    this._updateQueue = [];
    this._profileInProgress = new Set<string>();
  }

  async createProfile(user_id: string): Promise<void> {
    const profile = DefaultProfile;
    profile.id = user_id;
    try {
      await this._repository.create(profile);
    } catch (e) {
      this._profileInProgress.delete(user_id);
    }
  }

  async getProfile(user_id: string): Promise<ProfileFull | undefined> {
    let profile = await this._repository.findOne(user_id);
    if (profile === undefined) throw 'Profile not found!';

    const profileFull = await this._repository.findOneFull(user_id);
    if (!profileFull) throw 'Internal error';
    profileFull.chatsList = [];

    for (let chatId of profile.chatsIdList || []) {
      const c = await this._chatsRepository.findById(chatId);
      if (c) profileFull.chatsList.push(c);
    }

    return profileFull;
  }

  async update(user_id: string, dto: ProfileUpdateDTO): Promise<ProfileFull> {
    const profile = await this._repository.findOne(user_id);
    if (profile === undefined) throw 'User not found';
    profile.name = dto.name;
    profile.avatar = dto.avatar;
    await this._repository.update(user_id, profile);
    const profileFull: ProfileFull = {
      ...profile,
      chatsList: [],
      contactsList: [],
      account: BluzelleHelper.account,
      amount: BluzelleHelper.amount,
    };

    for (let contactId of profile.contactsIdList || []) {
      const c = await this._repository.findOne(contactId);
      if (c) profileFull.contactsList.push(c);
    }

    for (let chatId of profile.chatsIdList || []) {
      const c = await this._chatsRepository.findById(chatId);
      if (c) profileFull.chatsList.push(c);
    }

    return profileFull;
  }

  async addContact(
    user_id: string,
    contact_id: string,
  ): Promise<ProfileFull | undefined> {
    const profile = await this._repository.findOne(user_id);
    if (profile === undefined) throw 'User not found';
    profile.contactsIdList =  profile.contactsIdList || [];
    profile.contactsIdList = profile.contactsIdList.filter(
      (elm) => elm !== contact_id,
    );
    profile.contactsIdList.push(contact_id);

    await this._repository.update(user_id, profile);
    return await this.getProfile(user_id);
  }

  async list(): Promise<Profile[] | undefined> {
    const result = await this._repository.list();
    console.log(result);
    return result;
  }

  getUpdateQueue(): SocketUpdate[] {
    const copy = [...this._updateQueue];
    this._updateQueue = [];
    return copy;
  }
}
