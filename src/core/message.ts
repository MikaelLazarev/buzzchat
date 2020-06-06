/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {Contact} from "./contact";

export interface Message {
  id: string;
  text: string;
  createdAt: number | Date;
  user: Contact;
  pending: boolean;
}

export interface MessagesRepositoryI {
  findById(chatId: string, messageId: string): Promise<Message | undefined>;
  list(chatId: string): Promise<Message[] | undefined>;
  addMessage(id: string, message: Message): Promise<Message[] | undefined>;
  deleteMessage(
    chatId: string,
    messageId: string,
  ): Promise<Message[] | undefined>;
}
