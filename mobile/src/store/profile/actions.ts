/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Profile} from '../../core/profile';
import {ProfileActions} from './index';
import {Bluzelle} from '../../utils/getBluzelle';

// Get user profile from server
export const getProfile = (): ThunkAction<
  void,
  RootState,
  unknown,
  ProfileActions
> => async (dispatch) => {
  try {
    const bluzelle = new Bluzelle();
    const profile = JSON.parse(await bluzelle.read('buzzchat_profile'));
    dispatch({
      type: 'PROFILE_SUCCESS',
      payload: profile,
    });
  } catch (e) {
    dispatch({
      type: 'PROFILE_FAILURE',
      error: e,
    });
  }
};

export const updateProfile = (
  profile: Profile,
): ThunkAction<void, RootState, unknown, ProfileActions> => async (
  dispatch,
) => {};
