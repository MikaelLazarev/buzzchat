import {Contact} from './contact';
import {Chat} from './chat';

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
}

export const DefaultProfile: Profile = {
  id: '',
  name: '',
  avatar: '',
  contactsIdList: [],
  chatsIdList: [],
};

export interface ProfileUpdateDTO {
  name: string;
  avatar: string;
}

export const profileUpdateDTOSchema = {
  type: 'object',
  required: ['name', 'avatar'],
  properties: {
    name: {
      type: 'string',
    },
    avatar: {
      type: 'string',
    },
  },
};

export interface ProfilesRepositoryI {
  create(newProfile: Profile): Promise<Profile | undefined>;
  findOne(id: string): Promise<Profile | undefined>;
  update(user_id: string, newProfile: Profile): Promise<void>;
  list(): Promise<Profile[] | undefined>;
}

export interface ProfilesServiceI {
  getProfile(user_id: string): Promise<ProfileFull | undefined>;
  addContact(user_id: string, contact_id: string): Promise<Profile>;
  update(user_id: string, dto: ProfileUpdateDTO): Promise<ProfileFull>;
  list(): Promise<Profile[] | undefined>;
}
