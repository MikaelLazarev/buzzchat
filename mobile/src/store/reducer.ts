/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {combineReducers} from 'redux';
import {authReducer, operationReducer} from 'redux-data-connect';
import chats from './chats/reducer';
import contacts from './contacts/reducer';
import profile from './profile/reducer';

export default combineReducers({
  auth: authReducer,
  chats,
  contacts,
  profile,
  operations: operationReducer,
});
