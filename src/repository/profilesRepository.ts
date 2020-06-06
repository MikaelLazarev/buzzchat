import {Profile, ProfileFull, ProfilesRepositoryI} from '../core/profiles';
import {BluzelleHelper} from './bluzelleHelper';
import {injectable} from 'inversify';
import config from '../config/config';

@injectable()
export class ProfilesRepository implements ProfilesRepositoryI {
  private _blu: BluzelleHelper<Profile>;

  constructor() {
    this._blu = new BluzelleHelper<Profile>(config.mainDB + ':profiles');
  }

  findOne(id: string): Promise<Profile | undefined> {
    return this._blu.findOne(id);
  }

  async findOneFull(id: string): Promise<ProfileFull | undefined> {
    let profile = await this.findOne(id);
    if (profile === undefined)  throw "Profile not found!"

    const profileFull: ProfileFull = {
      ...profile,
      chatsList: [],
      contactsList: [],
      account: BluzelleHelper.account,
      amount: BluzelleHelper.amount,
    };

    for (let contactId of profile.contactsIdList || []) {
      const c = await this.findOne(contactId);
      if (c) profileFull.contactsList.push(c);
    }
    return profileFull;
  }

  update(user_id: string, newProfile: Profile): Promise<void> {
    return this._blu.update(user_id, newProfile);
  }

  async create(newProfile: Profile): Promise<Profile | undefined> {
    const existingAcc = await this._blu.findOne(newProfile.id);

    if (existingAcc !== undefined) {
      return existingAcc;
    }

    await this._blu.create(newProfile.id, newProfile);
    return newProfile;
  }

  list(): Promise<Profile[] | undefined> {
    return this._blu.list();
  }
}
