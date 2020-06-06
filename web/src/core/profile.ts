/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {Contact} from './contact';
import {Chat} from './chat';

export interface Profile{
  id: string;
  name: string;
  avatar: string;
  contactsList: Contact[];
  chatsList: Chat[];
  account: string;
  amount: string;
}

export interface ProfileChangeNameDTO {
  name: string;
}
