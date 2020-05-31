/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {Message} from './message';
import {SocketUpdate} from './operations';
import {Contact} from './contact';

export interface Chat {
  id: string;
  name: string;
  members: string[];
  isTetATetChat: boolean;
}

export interface ChatFull {
  id: string;
  name: string;
  members: Contact[];
  isTetATetChat: boolean;
  messages: Message[];
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

export interface ChatsRepositoryI {
  create(chat: Chat): Promise<Chat | undefined>;
  findById(id: string): Promise<Chat | undefined>;
}

export interface ChatsServiceI {
  create(user_id: string, dto: ChatCreateDTO): Promise<ChatFull | undefined>;
  findById(user_id: string, chat_id: string): Promise<ChatFull>;
  postMessage(user_id: string, dto: PostMessageDTO): Promise<ChatFull>;
  getUpdateQueue(): SocketUpdate[];
}
