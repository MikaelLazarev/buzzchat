/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {Contact} from './contact';

export interface Message {
  id: string;
  text: string;
  createdAt: number | Date;
  user: Contact;
}
