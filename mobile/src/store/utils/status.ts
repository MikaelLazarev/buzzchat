/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

export enum STATUS {
  STARTUP = '@@STATUS/STARTUP',
  UPDATE_NEEDED = 'STATUS: UPDATE_NEEDED',
  ACTIVE = '@@status/ACTTIVE',
  LOADING = '@@status/LOADING',
  UPDATING = '@@status/UPDATING',
  SUCCESS = '@@status/SUCCESS',
  FAILURE = '@@status/FAILURE',
}

