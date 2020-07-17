/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {Chat} from '../../core/chat';
import {CHATS_PREFIX} from './';
import {combineReducers} from 'redux';
import {createDataLoaderListReducer} from 'redux-data-connect';
import {createChatDataLoaderDetailsReducer} from './details';

export default combineReducers({
  List: createDataLoaderListReducer<Chat>(CHATS_PREFIX),
  Details: createChatDataLoaderDetailsReducer(),
});
