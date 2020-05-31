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
// @ts-ignore

@injectable()
export class ProfilesService implements ProfilesServiceI {
  private _repository: ProfilesRepositoryI;

  public constructor(
    @inject(TYPES.ProfilesRepository) repository: ProfilesRepositoryI,
  ) {
    this._repository = repository;
  }

  async getProfile(user_id: string): Promise<ProfileFull | undefined> {
    let profile = await this._repository.findOne(user_id);
    if (profile === undefined) {
      profile = DefaultProfile;
      profile.id = user_id;
      await this._repository.create(profile);
    }

    const profileFull: ProfileFull = {
      ...profile,
      chatsList: [],
      contactsList: [],
    };

    for (let contactId of profile.contactsIdList) {
      const c = await this._repository.findOne(contactId);
      if (c) profileFull.contactsList.push(c);
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
    };

    for (let contactId of profile.contactsIdList) {
      const c = await this._repository.findOne(contactId);
      if (c) profileFull.contactsList.push(c);
    }

    return profileFull;
  }

  async addContact(user_id: string, contact_id: string): Promise<Profile> {
    const profile = await this._repository.findOne(user_id);
    if (profile === undefined) throw 'User not found';
    profile.contactsIdList = [...profile.contactsIdList, contact_id];
    await this._repository.update(user_id, profile);
    return profile;
  }

  list(): Promise<Profile[] | undefined> {
    return Promise.resolve(undefined);
  }
}
