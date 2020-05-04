/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

export enum STATUS {
  UPDATE_NEEDED = 'STATUS: UPDATE_NEEDED',
  ACTIVE = 'STATUS: ACTIVE',
  LOADING = '@@status/LOADING',
  UPDATING = '@@status/UPDATING',
  SUCCESS = '@@status/SUCCESS',
  FAILURE = '@@status/FAILURE',
}

