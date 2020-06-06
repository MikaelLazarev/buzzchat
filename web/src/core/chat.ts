/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {Contact} from './contact';
import {Message} from './message';

export interface Chat {
  id: string;
  name: string;
  members: Contact[];
  messages: Message[];
  isTetATetChat: boolean;
}

export interface ChatCreateDTO {
  id: string;
  members: string[];
  isTetATetChat: boolean;
}

export interface PostMessageDTO {
  chat_id: string;
  msg: Message;
}
