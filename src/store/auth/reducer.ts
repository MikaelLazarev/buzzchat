/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {AuthStatus, Account} from '../../core/account';
import {AccountActions} from './';

export interface AuthState extends Account {
  status: AuthStatus;
}

const initialState: AuthState = {
  mnemonic: '',
  pubkey: '',
  status: 'AUTH_REQUIRED',
};

export default function createReducer(
  state: AuthState = initialState,
  action: AccountActions,
): AuthState {
  switch (action.type) {
    case 'ACCOUNT_REQUEST':
      return state;
    case 'ACCOUNT_SUCCESS':
      const account = action?.payload ? action.payload : state;
      return {
        ...account,
        status: 'READY',
      };
    case 'ACCOUNT_FAILURE':
      return {
        ...state,
        status: 'ERROR',
      };

    case 'AUTH_UPDATE_STATUS':
      return {
        ...state,
        status: action.status,
      };
  }

  return state;
}
