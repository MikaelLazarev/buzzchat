/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {Contact} from './contact';

export type ProfileStatus = 'SPLASH' | 'AUTH_REQUIRED' | 'READY' | 'ERROR';

export interface Profile {
  id?: string;
  status: ProfileStatus;
  pubkey?: string;
  mnemonic?: string;
  contact?: Contact;
}

export const APP_STATUS_SPLASH = 'SPLASH';
export const APP_STATUS_AUTH_REQUIRED = 'AUTH_REQUIRED';
export const APP_STATUS_READY = 'READY';
export const APP_STATUS_ERROR = 'ERROR';
