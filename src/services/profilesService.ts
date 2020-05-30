import {
  Profile,
  ProfilesRepositoryI,
  ProfilesServiceI,
    ProfileUpdateDTO
} from "../core/profiles";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
// @ts-ignore

@injectable()
export class ProfilesService implements ProfilesServiceI {
  private _repository: ProfilesRepositoryI;

  public constructor(
    @inject(TYPES.ProfilesRepository) repository: ProfilesRepositoryI
  ) {
    this._repository = repository;
  }

  async getProfile(user_id: string): Promise<Profile | undefined> {
    return this._repository.findOne(user_id);
  }

  async update(user_id: string, dto: ProfileUpdateDTO): Promise<void> {
    const profile = await this._repository.findOne(user_id);
    if (profile===undefined) throw "User not found";
    profile.name = dto.name;
    profile.avatar = dto.avatar;
    await this._repository.update(user_id, profile);
  }

  async addContact(user_id: string, contact_id: string): Promise<Profile> {
    const profile = await this._repository.findOne(user_id);
    if (profile===undefined) throw "User not found";
    profile.contactsUID = [...profile.contactsUID, contact_id];
    await this._repository.update(user_id, profile);
    return profile;
  }



  list(): Promise<Profile[] | undefined> {
    return Promise.resolve(undefined);
  }




}
