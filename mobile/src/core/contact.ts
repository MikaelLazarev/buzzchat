/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  pubKey?: string;
  zeroMessage?: string;
}
