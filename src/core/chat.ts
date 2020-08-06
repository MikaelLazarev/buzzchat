/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {MessageFull} from './message';
import {SocketUpdate} from './operations';
import {Contact} from './contact';
import {SocketPusherDelegateI} from "./socket";

export interface Chat {
  id: string;
  name: string;
  members: string[];
  isTetATetChat: boolean;
}

export interface ChatWithMembers {
  id: string;
  name: string;
  members: Contact[];
  isTetATetChat: boolean;
}

export interface ChatFull {
  id: string;
  name: string;
  members: Contact[];
  isTetATetChat: boolean;
  messages: MessageFull[];
}

export interface ChatCreateDTO {
  id: string;
  members: string[];
  isTetATetChat: boolean;
}

export interface PostMessageDTO {
  chatId: string;
  msg: MessageFull;
}

export interface DeleteMessageDTO {
  chatId: string;
  msgId: string;
}

export interface ChatsRepositoryI {
  create(chat: Chat): Promise<Chat | undefined>;
  findById(id: string): Promise<Chat | undefined>;
}

export interface ChatsServiceI extends SocketPusherDelegateI{
  create(user_id: string, dto: ChatCreateDTO): Promise<ChatFull | undefined>;
  findById(user_id: string, chat_id: string): Promise<ChatFull>;
  postMessage(user_id: string, dto: PostMessageDTO): Promise<void>;
  deleteMessage(user_id: string, dto: DeleteMessageDTO) : Promise<void>;
}
