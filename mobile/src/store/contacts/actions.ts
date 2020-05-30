/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {CONTACT_PREFIX, endpoint} from './';

import {
  createDataLoaderCreateUpdateDataAction,
  createDataLoaderDetailActions,
  createDataLoaderListActions,
} from '../dataloader/actions';
import {
  DataLoaderDetailsActions,
  DataLoaderListActions,
} from '../dataloader/types';
import {DETAIL_SUCCESS, getDetailsItem, LIST_SUCCESS} from '../dataloader';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Action} from 'redux';
import {Message} from '../../core/message';
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

export const getList = (): DataLoaderListActions<Contact> => {
  return {
    type: CONTACT_PREFIX + LIST_SUCCESS,
    payload: initData,
  };
};

export const getDetails = (id: string): DataLoaderDetailsActions<Contact> => {
  const found = initData.filter((e) => e.id === id);
  const detailUpdate = found === undefined ? undefined : found[0];

  return {
    type: CONTACT_PREFIX + DETAIL_SUCCESS,
    payload: detailUpdate,
    meta: {hash: '', id: id},
  };
};
