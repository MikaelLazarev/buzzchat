/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {CHATS_PREFIX, endpoint} from './';

import {
  createDataLoaderCreateUpdateDataAction,
  createDataLoaderListActions,
} from '../dataloader/actions';
import {Chat} from '../../core/chat';
import {
  DataLoaderDetailsActions,
  DataLoaderListActions,
} from '../dataloader/types';
import {DETAIL_SUCCESS, getDetailsItem, LIST_SUCCESS} from '../dataloader';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Action} from 'redux';
import {Message} from '../../core/message';

export const getList = (): DataLoaderListActions<Chat> => {
  return {
    type: CHATS_PREFIX + LIST_SUCCESS,
    payload: [
      {
        id: '0',
        name: 'Discuss 1M dollar',
        members: [
          {
            id: 1,
            name: 'John',
            pubKey: '0xp123123',
            avatar: '232.jpg',
          },
        ],
        messages: [],
      },
      {
        id: '1',
        name: 'Weather chat',
        members: [
          {
            id: 2,
            name: 'John',
            pubKey: '0xp123123',
            avatar: '232.jpg',
          },
        ],
        messages: [],
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
        type: CHATS_PREFIX + DETAIL_SUCCESS,
        payload: chatData.data,
      });
    }
  };
};


export const getDetails = (): DataLoaderDetailsActions<Chat> => {
  return {
    type: CHATS_PREFIX + DETAIL_SUCCESS,
    payload: {
      id: '0',
      name: 'Discuss 1M dollar',
      members: [
        {
          id: 1,
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
  CHATS_PREFIX,
);

export const reload = createDataLoaderListActions(
  endpoint + '/reload/',
  CHATS_PREFIX,
);
