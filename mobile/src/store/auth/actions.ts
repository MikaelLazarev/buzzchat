/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {
  createAction,
  RSAA,
  RSAAAction,
  RSAAResultAction,
} from 'redux-api-middleware';
import {getFullAPIAddress} from '../utils/api';
import * as actionTypes from './';

import {RootState} from '../index';
import {AuthPayload} from './reducer';
import {getProfile} from '../profile/actions';
import {SSO_ADDR} from '../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {updateStatus} from '../operations/actions';
import {STATUS} from '../utils/status';

export const login = (
  email: string,
  password: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  const endpoint = '/auth/login/';
  const json = JSON.stringify({email, password});

  dispatch(authenticate(endpoint, json));
};

export const loginWithPhone = (
  phone: string,
  code: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  const endpoint = '/api/users/login/';
  const json = JSON.stringify({phone, code});

  dispatch(authenticate(endpoint, json));
};

export const oauthAuthenticate = (
  provider: string,
  code: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  const endpoint = '/auth/google/done/';
  const json = JSON.stringify({provider, code});

  dispatch(authenticate(endpoint, json));
};

export const confirmEmail = (
  email: string,
  code: string,
  id: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  const endpoint = '/auth/confirm/';
  const json = JSON.stringify({email, code, id});

  dispatch(authenticate(endpoint, json));
};

// Send request for refresh token

export const refreshAccessToken = (
  token: string,
): RSAAAction<any, AuthPayload, void> => ({
  [RSAA]: {
    endpoint: getFullAPIAddress('/auth/token/refresh/', undefined, SSO_ADDR),
    method: 'POST',
    body: JSON.stringify({refresh: token}),
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin',
    // @ts-ignore
    options: {timeout: 10000},
    types: [
      actionTypes.TOKEN_REQUEST,
      actionTypes.TOKEN_RECEIVED,
      actionTypes.TOKEN_FAILURE,
    ],
  },
});

export const signup = (
  email: string,
  password: string,
): RSAAAction<any, AuthPayload, void> =>
  createAction({
    endpoint: getFullAPIAddress('/auth/signup/', undefined, SSO_ADDR),
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers: {'Content-Type': 'application/json'},
    types: [
      actionTypes.SIGNUP_REQUEST,
      actionTypes.SIGNUP_SUCCESS,
      actionTypes.SIGNUP_FAILURE,
    ],
  });

export const getCode = (
  phone: string,
  hash?: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  const action = await dispatch(
    createAction({
      endpoint: getFullAPIAddress('/api/users/send_code/', undefined, SSO_ADDR),
      method: 'POST',
      body: JSON.stringify({phone}),
      headers: {'Content-Type': 'application/json'},
      types: [
        actionTypes.GETCODE_REQUEST,
        actionTypes.GETCODE_SUCCESS,
        actionTypes.GETCODE_FAILURE,
      ],
    }),
  );

  if (action === undefined || action.error) {
    dispatch(updateStatus(hash || '0', STATUS.FAILURE, action.payload.message));
  } else {
    dispatch(updateStatus(hash || '0', STATUS.SUCCESS));
  }
  return action;
};

/*
  Authenticate flow
  @param endpoint
  @param body
 */
export const authenticate = (
  endpoint: string,
  body: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  const result = await dispatch<AuthPayload, void>(
    createAction({
      endpoint: getFullAPIAddress(endpoint, undefined, SSO_ADDR),
      method: 'POST',
      body: body,
      headers: {'Content-Type': 'application/json'},
      types: [
        actionTypes.LOGIN_REQUEST,
        actionTypes.LOGIN_SUCCESS,
        actionTypes.LOGIN_FAILURE,
      ],
    }),
  );

  if (
    result &&
    !result.error &&
    result.payload.refresh &&
    result.type === actionTypes.LOGIN_SUCCESS
  ) {
    await AsyncStorage.setItem('token', result.payload.refresh.toString());
    await dispatch(getProfile());
  }

  console.log(result);
};

export const logout = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  // Clear local storage at logout
  await AsyncStorage.clear();
  dispatch({
    type: actionTypes.LOGOUT,
  });
};

export const getTokenAtStartup = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    const result = await dispatch(refreshAccessToken(token));
    if (
      !result.error &&
      result.payload.refresh &&
      result.type === actionTypes.TOKEN_RECEIVED
    ) {
      await dispatch(getProfile());
    }
  }
};

declare module 'redux-thunk' {
  /*
   * Overload to add api middleware support to Redux's dispatch() function.
   * Useful for react-redux or any other library which could use this type.
   */

  interface ThunkDispatch<S, E, A extends Action> {
    <T extends A>(action: T): T;
    <R>(asyncAction: ThunkAction<R, S, E, A>): R;
    <Payload, Meta>(action: RSAAAction<any, Payload, Meta>): Promise<
      RSAAResultAction<Payload, Meta>
    >;
  }
}
