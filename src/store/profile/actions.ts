/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Profile, ProfileStatus} from '../../core/profile';
import AsyncStorage from '@react-native-community/async-storage';
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
    const value = await AsyncStorage.getItem('profile');
    if (value !== null) {
      // We have data!!
      console.log(value);
      const data: Profile = JSON.parse(value);
      dispatch(auth(data));
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
  profileUpdate: Profile,
): ThunkAction<void, RootState, unknown, ProfileActions> => async (
  dispatch,
) => {
  const existingProfileString = await AsyncStorage.getItem('profile');
  if (existingProfileString !== null) {
    const existingProfile: Profile = JSON.parse(existingProfileString);
    profileUpdate = {
      status: 'READY',
      pubkey: profileUpdate.pubkey || existingProfile.pubkey,
      mnemonic: profileUpdate.mnemonic || existingProfile.mnemonic,
      contact: profileUpdate.contact || existingProfile.contact,
    };
  }

  await AsyncStorage.setItem('profile', JSON.stringify(profileUpdate));
  dispatch(auth(profileUpdate));
};

const auth = (
  profile: Profile,
): ThunkAction<void, RootState, unknown, ProfileActions> => async (
  dispatch,
) => {
  if (profile.mnemonic === undefined || profile.pubkey === undefined) {
    dispatch({
      type: 'PROFILE_FAILURE',
      payload: {
        ...profile,
        status: 'AUTH_REQUIRED',
      },
    });
    return;
  }

  Bluzelle.mnemonic = profile.mnemonic;
  Bluzelle.address = profile.pubkey;

  const bluzelle = new Bluzelle(profile.pubkey);
  return bluzelle.check();
};
