/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {Contact} from './contact';

export interface Message {
  _id: number;
  text: string;
  createdAt: Date;
  user: Contact;
}
