/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */
import {Account, AuthStatus} from '../../core/account';

export type AccountActions =
  | {
      type: 'ACCOUNT_REQUEST' | 'ACCOUNT_SUCCESS' | 'ACCOUNT_FAILURE';
      payload?: Account;
      error?: string;
    }
  | {type: 'AUTH_UPDATE_STATUS'; status: AuthStatus};
