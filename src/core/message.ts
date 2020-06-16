/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {Contact} from "./contact";

export interface MessageFull {
  id: string;
  text: string;
  createdAt: number | Date;
  user?: Contact;
  pending: boolean;
}

export interface Message {
  id: string;
  text: string;
  createdAt: number | Date;
  userId: string;
  user?: Contact; // user for stored messages only, depreciated
}

export interface MessagesRepositoryI {
  findById(chatId: string, messageId: string): Promise<Message | undefined>;
  list(chatId: string): Promise<Message[] | undefined>;
  addMessage(id: string, message: MessageFull): Promise<Message[] | undefined>;
  deleteMessage(
    chatId: string,
    messageId: string,
  ): Promise<Message[] | undefined>;
}
