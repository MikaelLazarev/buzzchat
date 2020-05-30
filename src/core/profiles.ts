export interface Profile {
  phone: string;
  id: string;
  name: string;
  avatar: string;
  contactsUID: string[];
}

export interface ProfileUpdateDTO {
  name: string;
  avatar: string;
}

export const profileUpdateDTOSchema = {
  type: "object",
  required: ["name", "avatar"],
  properties: {
    name: {
      type: "string",
    },
    avatar: {
      type: "string",
    },
  },
};


export interface ProfilesRepositoryI {
  findOne(id: string): Promise<Profile | undefined>;
  update(user_id: string, newProfile: Profile) : Promise<void>
  list(): Promise<Profile[] | undefined>;
}

export interface ProfilesServiceI {
  getProfile(user_id: string): Promise<Profile | undefined>;
  addContact(user_id: string, contact_id: string): Promise<Profile>;
  update(user_id: string, dto: ProfileUpdateDTO) : Promise<void>
  list(): Promise<Profile[] | undefined>;
}
