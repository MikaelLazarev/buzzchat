/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {createAction} from 'redux-api-middleware';

import {RootState} from '../index';
import {SSO_ADDR} from '../../../config';
import AsyncStorage from '@react-native-community/async-storage';
import {
  createGetTokenAtStartupAction,
  createLogoutAction,
  journaledOperation,
  withAuth,
  getFullUrl,
} from 'redux-data-connect';
import {
  createGetCodeAction,
  createLoginByPhoneAction,
} from 'redux-data-connect/lib/auth/actions';

// Persistence management
const tokenPersistenceGetter = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};
const tokenPersistenceSetter = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};

const localDataPersistenceCleaner = async () => await AsyncStorage.clear();

// Login actions
export const getCode = createGetCodeAction(
  getFullUrl('/auth/phone/get_code/', {host: SSO_ADDR}),
);
export const loginByPhone = createLoginByPhoneAction(
  getFullUrl('/auth/phone/login/', {
    host: SSO_ADDR,
  }),
  tokenPersistenceSetter,
);

// Startup actions
export const getTokenAtStartup = createGetTokenAtStartupAction(
  getFullUrl('/auth/token/refresh/', {
    host: SSO_ADDR,
  }),
  tokenPersistenceGetter,
);

// Logout action
const logoutAction = createLogoutAction(localDataPersistenceCleaner);

export const logout = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  // Clear local storage at logout

  dispatch(logoutAction());
  dispatch({
    type: 'SOCKET_OFF',
  });
};

// Web auth action
export const authWeb = (
  code: string,
  opHash: string = '0',
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return journaledOperation(
    createAction({
      endpoint: getFullUrl('/auth/web_auth/', {host: SSO_ADDR}),
      method: 'POST',
      body: JSON.stringify({code}),
      headers: withAuth({'Content-Type': 'application/json'}),
      types: ['AUTH_WEB_REQUEST', 'AUTH_WEB_SUCCESS', 'AUTH_WEB_FAILURE'],
    }),
    opHash,
  );
};
