/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import * as auth from './auth/actions';
import * as chats from './chats/actions';
import * as contacts from './contacts/actions';
import * as profile from './profile/actions';
import * as operations from './operations/actions';

export default {
  auth,
  chats,
  contacts,
  profile,
  operations,
};
