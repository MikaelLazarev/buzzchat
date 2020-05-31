import { Profile, ProfilesRepositoryI } from "../core/profiles";
import { BluzelleHelper } from "./bluzelleHelper";
import { injectable } from "inversify";
import config from "../config/config";

@injectable()
export class ProfilesRepository implements ProfilesRepositoryI {
  private _blu: BluzelleHelper<Profile>;

  constructor() {
    this._blu = new BluzelleHelper<Profile>(config.mainDB);
  }

  findOne(id: string): Promise<Profile | undefined> {
    return this._blu.findOne(id);
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
