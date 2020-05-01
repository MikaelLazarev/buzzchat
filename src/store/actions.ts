/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import * as auth from './auth/actions';
import * as chats from './chats/actions';
import {ThunkAction} from 'redux-thunk';
import {RootState} from './index';
import {Action} from 'redux';

// Connect socket connects redux with socket server interface
export const actionsAfterAuth = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  //   // Connect sockets to listen server events
  //   dispatch(accounts.getLocalAccountsList());
  //   dispatch(accounts.connectSocket());
  //   dispatch(bonds.connectSocket());
  //   dispatch(companies.connectSocket());
  //   dispatch(payments.connectSocket());
  //   dispatch(operations.connectSocket());
  //   dispatch(offers.connectSocket());
  //   console.log("[SOCKET.IO]: All listeners connected!")
};

export default {
  auth,
  chats,
};
