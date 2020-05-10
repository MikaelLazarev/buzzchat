/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {AuthStatus, Account} from '../../core/account';
import {AccountActions} from './';
import {STATUS} from '../utils/status';

export interface AuthState extends Account {
  status: AuthStatus;
  hashes: Record<string, STATUS>;
  error?: string;
}

const initialState: AuthState = {
  mnemonic: '',
  status: 'AUTH_REQUIRED',
  hashes: {},
  error: '',
};

export default function createReducer(
  state: AuthState = initialState,
  action: AccountActions,
): AuthState {
  switch (action.type) {
    case 'ACCOUNT_REQUEST':
      return {
        ...state,
        hashes: {
          [action.hash || '0']: STATUS.UPDATING,
          ...state.hashes,
        },
      };
    case 'ACCOUNT_SUCCESS':
      const account = action?.payload ? action.payload : state;
      return {
        ...account,
        status: 'READY',
        hashes: {
          [action.hash || '0']: STATUS.SUCCESS,
          ...state.hashes,
        },
      };
    case 'ACCOUNT_FAILURE':
      return {
        ...state,
        status: 'ERROR',
        hashes: {
          [action.hash || '0']: STATUS.FAILURE,
          ...state.hashes,
        },
        error: action.error,
      };

    case 'AUTH_UPDATE_STATUS':
      return {
        ...state,
        status: action.status,
      };
  }

  return state;
}
