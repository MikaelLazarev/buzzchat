/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {combineReducers} from 'redux';
import auth from './auth/reducer';
import chats from './chats/reducer';
import contacts from './contacts/reducer';

export default combineReducers({
  auth,
  chats,
  contacts,
});
