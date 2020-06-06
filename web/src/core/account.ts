/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

export type AuthStatus = 'SPLASH' | 'AUTH_REQUIRED' | 'READY' | 'ERROR';

export interface Account {
  address?: string
  mnemonic?: string;
}
