/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {CONTACT_PREFIX} from './';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Action} from 'redux';
import {namespace} from '../profile';
import {LIST_FAILURE, LIST_SUCCESS} from '../dataloader';
import {SocketEmitAction} from "../socketMiddleware";

export const connectSocket = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({
    type: 'SOCKET_ON',
    namespace,
    event: 'profile:updateList',
    typeOnSuccess: CONTACT_PREFIX + LIST_SUCCESS,
  });
};

export const getList: (opHash: string) => SocketEmitAction = (opHash) => ({
  type: 'SOCKET_EMIT',
  namespace,
  event: 'profile:list',
  typeOnFailure: CONTACT_PREFIX + LIST_FAILURE,
  payload: undefined,
  opHash,
});
