/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {DataLoaderDetailsActions} from '../dataloader/types';
import {CHATS_PREFIX} from './index';
import {DETAIL_FAILURE, DETAIL_SUCCESS} from '../dataloader';
import {Chat} from '../../core/chat';
import {DataItem} from '../dataloader/reducer';
import {STATUS} from '../utils/status';
import {Message} from '../../core/message';

export type DataLoaderDetailsState<Chat> = {
  data: Record<string, DataItem<Chat>>;
  hashes: Record<string, DataItem<Chat>>;
};

export function createDataLoaderDetailsReducer() {
  const initialState: DataLoaderDetailsState<Chat> = {
    data: {},
    hashes: {},
  };

  const updateDetailState = (
    state: DataLoaderDetailsState<Chat>,
    id: string,
    hash: string,
    newData: DataItem<Chat>,
  ): DataLoaderDetailsState<Chat> => ({
    ...state,
    data: {
      ...state.data,
      [id]: newData,
    },
    hashes: {
      ...state.hashes,
      [hash]: newData,
    },
  });

  return function (
    state: DataLoaderDetailsState<Chat> = initialState,
    action: DataLoaderDetailsActions<Chat>,
  ): DataLoaderDetailsState<Chat> {
    let id = action? action.payload? action.payload.id : undefined : undefined;
    if (id === undefined) {
      id = '-';
    }

    switch (action.type) {
      case CHATS_PREFIX + DETAIL_SUCCESS:
        const existingChat = state.data[id];
        let pendingMessages = new Map<string, Message>();
        if (existingChat !== undefined && existingChat.data !== undefined) {
          existingChat.data.messages
            .filter((msg) => msg.pending)
            .forEach((msg) => pendingMessages.set(msg.id, msg));
        }

        if (action.payload !== undefined) action.payload.messages.forEach((msg) =>
          pendingMessages.set(msg.id, msg),
        );

        return updateDetailState(state, id, '0', {
          data:
            action.payload === undefined
              ? undefined
              : {
                  ...action.payload,
                  messages: Array.from(pendingMessages.values()),
                },
          status: STATUS.SUCCESS,
        });

      case CHATS_PREFIX + 'PENDING_MESSAGE':
        console.log('PNNNNND', action);
        const existingChat2 = state.data[id];
        if (
          existingChat2 === undefined ||
          existingChat2.data === undefined ||
          action.payload === undefined
        ) {
          return state;
        }
        console.log('PNNNNND-2', action);
        return updateDetailState(state, id, '0', {
          data: {
            ...existingChat2.data,
            messages: [
              ...existingChat2.data.messages,
              ...action.payload.messages,
            ],
          },
          status: STATUS.SUCCESS,
        });

      case CHATS_PREFIX + DETAIL_FAILURE:
        return updateDetailState(state, id, '0', {
          data: undefined,
          status: STATUS.FAILURE,
        });

      default:
        return state;
    }
  };
}
