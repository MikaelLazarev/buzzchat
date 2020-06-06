/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */
import {Profile} from '../../core/profile';
export const namespace = 'profile';
export const endpoint = '/api/profile/';
export type ProfileActions = {
  type: 'PROFILE_REQUEST' | 'PROFILE_SUCCESS' | 'PROFILE_FAILURE';
  payload?: Profile;
  error?: boolean;
};
