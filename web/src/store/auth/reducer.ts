/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import jwtDecode from 'jwt-decode';
import {AuthActions} from "./";
import {AuthStateType, TokenDTO} from "redux-data-connect/lib/auth";

export interface AuthState extends AuthStateType{
  webcode: string,
}

const initialState: AuthState = {
  access: undefined,
  refresh: undefined,
  status: 'AUTH_STARTUP',
  webcode: '',
};

export default (
  state: AuthState = initialState,
  action: AuthActions,
): AuthState => {
  console.log(action);

  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        ...state,
        access: {
          ...jwtDecode<TokenDTO>(action.payload.access),
          token: action.payload.access,
        },
        refresh: {
          ...jwtDecode<TokenDTO>(action.payload.refresh || ''),
          token: action.payload.refresh || '',
        },
        status: 'AUTH_SUCCESS',
      };

    case 'AUTH_FAILURE':
      return {
        ...state,
        access: undefined,
        refresh: undefined,
      };


    case 'LOGOUT':
      return {
        ...state,
        access: undefined,
        refresh: undefined,
        status: 'AUTH_REQUIRED',
      };

    case 'GETCODE_SUCCESS':
      return {
        ...state,
        webcode: action.payload.code,
      };
    default:
      return state;
  }
};
