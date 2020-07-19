/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {combineReducers} from 'redux';
import auth from './auth/reducer';
import chats from './chats/reducer';
import contacts from './contacts/reducer';
import profile from './profile/reducer';
import {operationReducer} from 'redux-data-connect';

export default combineReducers({
  auth,
  chats,
  contacts,
  profile,
  operations : operationReducer,
});
