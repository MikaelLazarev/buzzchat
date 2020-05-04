/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */
import {Profile, ProfileStatus} from '../../core/profile';

export const endpoint = '/api/profile/';

export type ProfileActions =
  | {
      type: 'PROFILE_REQUEST' | 'PROFILE_SUCCESS' | 'PROFILE_FAILURE';
      payload?: Profile;
      error?: boolean;
    }
  | {type: 'PROFILE_UPDATE_STATUS'; status: ProfileStatus};
