import {Contact} from './contact';
import {Chat} from './chat';
import {SocketUpdate} from './operations';

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  contactsIdList: string[];
  chatsIdList: string[];
}

export interface ProfileFull {
  id: string;
  name: string;
  avatar: string;
  contactsList: Contact[];
  chatsList: Chat[];
  account: string;
  amount: string;

}

export const DefaultProfile: Profile = {
  id: '',
  name: 'New user',
  avatar: '',
  contactsIdList: [],
  chatsIdList: [],
};

export interface ProfileUpdateDTO {
  name: string;
  avatar: string;
}

export interface ProfileContactDTO {
  id: string;
}

export interface ProfilesRepositoryI {
  create(newProfile: Profile): Promise<Profile | undefined>;
  findOne(id: string): Promise<Profile | undefined>;
  findOneFull(id: string): Promise<ProfileFull | undefined>;
  update(user_id: string, newProfile: Profile): Promise<void>;
  list(): Promise<Profile[] | undefined>;
}

export interface ProfilesServiceI {
  getProfile(user_id: string): Promise<ProfileFull | undefined>;
  addContact(
    user_id: string,
    contact_id: string,
  ): Promise<ProfileFull | undefined>;

  update(user_id: string, dto: ProfileUpdateDTO): Promise<ProfileFull>;
  list(): Promise<Profile[] | undefined>;
  getUpdateQueue(): SocketUpdate[];
}

export const profile2Contact = (p: Profile): Contact => ({
  id: p.id,
  avatar: p.avatar,
  name: p.name,
});
