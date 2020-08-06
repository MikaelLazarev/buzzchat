/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {Contact} from './contact';
import {Chat, ChatWithMembers} from './chat';
import {SocketUpdate} from './operations';
import {SocketPusherDelegateI} from "../controllers/socketRouter";

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
  chatsList: ChatWithMembers[];
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
  findOneContact(id: string): Promise<Contact | undefined>
  update(user_id: string, newProfile: Profile): Promise<void>;
  list(): Promise<Profile[] | undefined>;
}

export interface ProfilesServiceI extends SocketPusherDelegateI {
  createProfile(user_id: string): Promise<void>;
  getProfile(user_id: string): Promise<ProfileFull | undefined>;
  addContact(
    user_id: string,
    contact_id: string,
  ): Promise<ProfileFull | undefined>;

  update(user_id: string, dto: ProfileUpdateDTO): Promise<ProfileFull | undefined>;
  list(): Promise<Profile[] | undefined>;
}

export const profile2Contact = (p: Profile): Contact => ({
  id: p.id,
  avatar: p.avatar,
  name: p.name,
});
