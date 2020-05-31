/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {CONTACT_PREFIX, endpoint} from './';

import {
  createDataLoaderListActions,
} from '../dataloader/actions';
import {
  DataLoaderDetailsActions,
} from '../dataloader/types';
import {DETAIL_SUCCESS} from '../dataloader';
import {Contact} from '../../core/contact';

const initData = [
  {
    id: '0',
    name: 'Vasilii Petrov',
    avatar: '',
  },
  {
    id: '1',
    name: 'Eji Gorovets',
    avatar: '',
  },
];

export const getList = createDataLoaderListActions(endpoint, CONTACT_PREFIX);

