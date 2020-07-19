/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */
import {ThunkAction} from 'redux-thunk';

import {RootState} from '../index';
import {BACKEND_ADDR} from '../../config';
import {actionsAfterAuth} from '../actions';
import io from 'socket.io-client';
import {AuthActions} from './';
import {TokenPayload} from "redux-data-connect/lib/auth";
import {Action} from "redux";
import {SSO_ADDR} from "../../config";
import {createGetTokenAtStartupAction, getFullUrl} from "redux-data-connect";


// Startup actions
export const getTokenAtStartup = createGetTokenAtStartupAction(
    getFullUrl('/auth/token/refresh/', {
      host: SSO_ADDR,
    }),
);

let socket : SocketIOClient.Socket | undefined = undefined;

export const getWebConnectCode = (
  hash?: string,
): ThunkAction<void, RootState, unknown, AuthActions>  => async (
  dispatch,
) => {
  if (socket === undefined) {
    socket = io(BACKEND_ADDR + '/webwait', {
      autoConnect: true,
      reconnection: true,
      forceNew: true,
    });

    socket.on('connect_error', (err: string) => {
      console.log(err);
    });

    socket.on('code', (code: string) => {
      console.log(code);
      dispatch({
        type: 'GETCODE_SUCCESS',
        payload: {
          code,
        },
      });
    });

    socket.on('login', async (payload: TokenPayload) => {
      console.log(payload);
      if (payload.refresh === undefined) {
        dispatch({
          type: 'AUTH_FAILURE',
          payload,
        });
        return;
      }
      dispatch({
        type: 'AUTH_SUCCESS',
        payload,
      });
      localStorage.setItem('token', payload.refresh.toString());
      await dispatch(actionsAfterAuth());
    });

    socket.on('disconnect', () => {
      dispatch(getWebConnectCode());
    });

    socket.emit('getCode');
  }
};

export const logout = (): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
    > => async (dispatch) => {
  // Clear local storage at logout
  await localStorage.clear();
  dispatch({
    type: 'LOGOUT',
  });

  dispatch({
    type: 'PROFILE_LOGOUT',
  })
};
