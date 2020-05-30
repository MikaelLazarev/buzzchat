import {ChatStore} from './ChatStore';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Action} from 'redux';
import {CHATS_PREFIX} from './index';
import {DETAIL_SUCCESS} from '../dataloader';

export class Chats {
  private static chats: Map<string, ChatStore> = new Map<string, ChatStore>();

  public static updateChatDetails(
    id: string,
  ): ThunkAction<void, RootState, unknown, Action<string>> {
    return async (dispatch, getState) => {
      if (!this.chats.has(id)) {
        // Load chat details from database;
      }

      const chat = this.chats.get(id);
      if (chat === undefined) {
        return;
      }
      await chat.readChain();
      dispatch({
        type: CHATS_PREFIX + DETAIL_SUCCESS,
        payload: chat.toChat(),
      });
    };
  }
}

export const updateChatDetails = Chats.updateChatDetails;
