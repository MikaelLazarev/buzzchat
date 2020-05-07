/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Profile} from '../../core/profile';
import AsyncStorage from '@react-native-community/async-storage';
import {ProfileActions} from './index';

// Get user profile from server
export const getProfile = (): ThunkAction<
  void,
  RootState,
  unknown,
  ProfileActions
> => async (dispatch) => {
  try {
    const value = await AsyncStorage.getItem('profile');
    if (value !== null) {
      // We have data!!
      console.log(value);
      const data: Profile = JSON.parse(value);
      dispatch({
        type: 'PROFILE_SUCCESS',
        payload: {
          status: 'READY',
          payload: data,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: 'PROFILE_FAILURE',
      payload: {
        status: 'AUTH_REQUIRED',
        payload: undefined,
      },
    });
  }
  dispatch({
    type: 'PROFILE_FAILURE',
    payload: {
      status: 'AUTH_REQUIRED',
      payload: undefined,
    },
  });
};

export const updateProfile = (
  profile: Profile,
): ThunkAction<void, RootState, unknown, ProfileActions> => async (
  dispatch,
) => {
  await AsyncStorage.setItem('profile', JSON.stringify(profile));
  dispatch({
    type: 'PROFILE_SUCCESS',
    payload: {
      status: 'READY',
      payload: profile,
    },
  });
};
