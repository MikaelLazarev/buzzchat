/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */
import {RootState} from '../index';

export const CHATS_PREFIX = 'CHATS@@';
export const endpoint = '/api/chats/';

export const chatDetailsDataSelector = (id: string) => (state: RootState) =>
  state.chats.Details.data[id]?.data;
