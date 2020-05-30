/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

export const BACKEND_ADDR =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://tz-factor-server-stage.herokuapp.com';

export const SSO_ADDR =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'http://localhost:4000';
