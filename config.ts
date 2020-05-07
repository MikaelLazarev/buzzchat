/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

export const BACKEND_ADDR =
  process.env.NODE_ENV === 'development'
    ? 'localhost:4000'
    : 'https://tz-factor-server-stage.herokuapp.com';

export const SSO_ADDR =
  process.env.NODE_ENV === 'development'
    ? 'https://crm.tz-factor.com'
    : 'https://crm.tz-factor.com';

export const BLUZELLE_CHAINID = 'bluzelle';
export const BLUZELLE_ENDPOINT = 'tcp://testnet.public.bluzelle.com:26657';
