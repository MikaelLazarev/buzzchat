/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
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
  chatId: string;
  msg: Message;
}

export interface DeleteMessageDTO {
  chatId: string;
  msgId: string;
}
