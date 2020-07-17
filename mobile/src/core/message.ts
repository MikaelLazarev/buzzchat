/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {Contact} from './contact';
import {IMessage} from 'react-native-gifted-chat';

export interface Message {
  id: string;
  text: string;
  createdAt: number | Date;
  user: Contact;
  pending: boolean;
}

export function mapMessageToIMessage(message: Message) {
  return {
    _id: message.id,
    text: message.text,
    createdAt: message.createdAt,
    user: {
      _id: message.user?.id,
      ...message.user,
    },
    pending: message.pending || false,
  };
}
