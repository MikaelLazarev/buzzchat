/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {endpoint, CHATS_PREFIX} from './';

import {
  createDataLoaderCreateUpdateDataAction,
  createDataLoaderDetailActions,
  createDataLoaderListActions,
} from '../dataloader/actions';
import {Chat} from '../../core/chat';
import {DataLoaderListActions} from '../dataloader/types';
import {LIST_SUCCESS} from '../dataloader';

export const getList = (): DataLoaderListActions<Chat> => {
  return {
    type: CHATS_PREFIX + LIST_SUCCESS,
    payload: [
      {
        id: '232323',
        person: {
          name: 'John',
          surname: 'Applesead',
          pubKey: '0xp123123',
        },
      },
      {
        id: '232323',
        person: {
          name: 'John',
          surname: 'Applesead',
          pubKey: '0xp123123',
        },
      },
    ],
  };
};

export const getDetails = createDataLoaderDetailActions(
  endpoint + 'p/:id/',
  CHATS_PREFIX,
);

export const createUpdateDetails = createDataLoaderCreateUpdateDataAction<Chat>(
  endpoint,
  endpoint + 'p/:id/',
  CHATS_PREFIX,
);

export const reload = createDataLoaderListActions(
  endpoint + '/reload/',
  CHATS_PREFIX,
);
