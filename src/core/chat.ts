/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {Contact} from './contact';
import {IMessage} from 'react-native-gifted-chat';

export interface Chat {
  id: string;
  name: string;
  members: Contact[];
  messages: IMessage[];
}
