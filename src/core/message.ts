/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */


export interface Message {
  id: string;
  text: string;
  createdAt: number | Date;
  pending: boolean;
}

export interface MessagesRepositoryI {
  list(chatId: string): Promise<Message[] | undefined>;
  addMessage(id: string, message: Message): Promise<Message[] | undefined>
}
