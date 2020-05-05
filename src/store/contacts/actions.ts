/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {CONTACT_PREFIX, endpoint} from './';

import {
  createDataLoaderCreateUpdateDataAction,
  createDataLoaderDetailActions,
  createDataLoaderListActions,
} from '../dataloader/actions';
import {
  DataLoaderDetailsActions,
  DataLoaderListActions,
} from '../dataloader/types';
import {DETAIL_SUCCESS, getDetailsItem, LIST_SUCCESS} from '../dataloader';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Action} from 'redux';
import {Message} from '../../core/message';
import {Contact} from '../../core/contact';

export const getList = (): DataLoaderListActions<Contact> => {
  return {
    type: CONTACT_PREFIX + LIST_SUCCESS,
    payload: [
      {
        id: '0',
        name: 'Vasilii Petrov',
        avatar: '',
      },
      {
        id: '1',
        name: 'Eji Gorovets',
        avatar: '',
      },
    ],
  };
};

export const addMessage = (
  chatId: string,
  message: Message,
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch, getState) => {
    const state = getState();
    const chatData = getDetailsItem(state.chats.Details, chatId);
    if (chatData !== undefined && chatData.data !== undefined) {
      chatData.data.messages.push(message);
      console.log(chatData.data);
      dispatch({
        type: CONTACT_PREFIX + DETAIL_SUCCESS,
        payload: chatData.data,
      });
    }
  };
};

export const getDetails = (): DataLoaderDetailsActions<Contact> => {
  return {
    type: CONTACT_PREFIX + DETAIL_SUCCESS,
    payload: {
      id: '0',
      name: 'Discuss 1M dollar',
      members: [
        {
          _id: 1,
          name: 'John',
          pubKey: '0xp123123',
          avatar: '232.jpg',
        },
      ],
      messages: [],
    },
    meta: {hash: '', id: '0'},
  };
};

export const createUpdateDetails = createDataLoaderCreateUpdateDataAction<Chat>(
  endpoint,
  endpoint + 'p/:id/',
  CONTACT_PREFIX,
);

export const reload = createDataLoaderListActions(
  endpoint + '/reload/',
  CONTACT_PREFIX,
);
