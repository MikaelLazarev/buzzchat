/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {endpoint, CHATS_PREFIX} from './';

import {
  Chat,
  ChatCreateDTO,
  DeleteMessageDTO,
  PostMessageDTO,
} from '../../core/chat';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Action} from 'redux';
import {namespace} from '../profile';
import {DETAIL_FAILURE, DETAIL_SUCCESS} from '../dataloader';
import {SocketEmitAction} from '../socketMiddleware';

export const connectSocket = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'chat:updateDetails',
    typeOnSuccess: CHATS_PREFIX + DETAIL_SUCCESS,
  });
};

export const create: (
  dto: ChatCreateDTO,
  opHash: string,
) => SocketEmitAction = (dto, opHash) => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'chat:create',
  typeOnFailure: CHATS_PREFIX + DETAIL_SUCCESS,
  payload: dto,
  opHash,
});

export const getDetails: (id: string, opHash: string) => SocketEmitAction = (
  id,
  opHash,
) => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'chat:retrieve',
  typeOnFailure: CHATS_PREFIX + DETAIL_FAILURE,
  payload: id,
  opHash,
});

export const postMessage: (
  dto: PostMessageDTO,
  opHash: string,
) => ThunkAction<void, RootState, unknown, Action<string>> = (
  dto,
  opHash,
) => async (dispatch, getState) => {
  const state = getState();
  const chat = state.chats.Details.data[dto.chatId].data as Chat;
  chat.messages.push(dto.msg);

  dispatch({
    type: CHATS_PREFIX + DETAIL_SUCCESS,
    payload: chat,
  });

  dispatch({
    type: 'SOCKET_EMIT',
    namespace,
    event: 'chat:postMessage',
    typeOnFailure: CHATS_PREFIX + DETAIL_SUCCESS,
    payload: dto,
    opHash,
  });
};

export const deleteMessage: (
  dto: DeleteMessageDTO,
  opHash: string,
) => ThunkAction<void, RootState, unknown, Action<string>> = (
  dto,
  opHash,
) => async (dispatch, getState) => {
  const state = getState();
  const chat = state.chats.Details.data[dto.chatId].data as Chat;
  chat.messages = chat.messages.filter((msg) => msg.id !== dto.msgId);

  dispatch({
    type: CHATS_PREFIX + DETAIL_SUCCESS,
    payload: chat,
  });

  dispatch({
    type: 'SOCKET_EMIT',
    namespace,
    event: 'chat:deleteMessage',
    typeOnFailure: CHATS_PREFIX + DETAIL_SUCCESS,
    payload: dto,
    opHash,
  });
};
