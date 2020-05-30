/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {Message} from './message';

export interface Chat {
  id: string;
  name: string;
  members: string[];
}

export interface ChatFull {
  id: string;
  name: string;
  members: string[];
  messages: Message[];
}


export interface PostMessageDTO {
  chat_id: string,
  msg: Message,
}

export interface ChatsRepositoryI {
  findById(id: string): Promise<Chat| undefined>;
}

export interface ChatsServiceI {
  findById(user_id: string, chat_id: string): Promise<ChatFull>;
  postMessage(user_id: string, dto: PostMessageDTO) : Promise<void>;
  list(): Promise<Chat[] | undefined>;
}
