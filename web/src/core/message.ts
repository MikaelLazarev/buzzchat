/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {Contact} from './contact';

export interface Message {
  id: string;
  text: string;
  createdAt: number | Date;
  user: Contact;
  pending: boolean;
}

