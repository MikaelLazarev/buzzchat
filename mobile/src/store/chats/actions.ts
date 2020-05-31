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

export const getList = createDataLoaderListActions(endpoint, CHATS_PREFIX);

export const getDetails = createDataLoaderDetailActions(
  endpoint + 'p/:id/',
  CHATS_PREFIX,
);

export const createUpdateDetails = createDataLoaderCreateUpdateDataAction<
  Chat
>(endpoint, endpoint + 'p/:id/', CHATS_PREFIX);

