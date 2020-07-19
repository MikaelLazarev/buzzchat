/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {TokenPayload} from "redux-data-connect/lib/auth";

export interface getCodePayload {
    code: string,
}
// AUTH handlers
export type AuthActions = {
  type: 'AUTH_SUCCESS' | 'AUTH_FAILURE',
  payload:  TokenPayload
} | {
  type: 'GETCODE_SUCCESS',
  payload: getCodePayload
} | {
  type: 'LOGOUT'
}
