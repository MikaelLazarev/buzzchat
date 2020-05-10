/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import AsyncStorage from '@react-native-community/async-storage';
import {AccountActions} from './index';
import {Bluzelle} from '../../utils/getBluzelle';

// Get user profile from server
export const getAccountFromStorage = (): ThunkAction<
  void,
  RootState,
  unknown,
  AccountActions
> => async (dispatch) => {
  try {
    const mnemonic = await AsyncStorage.getItem('account');
    if (mnemonic !== null) {
      // We have data!!
      console.log(mnemonic);
      dispatch(authentificate(mnemonic));
    }
  } catch (error) {
    dispatch({
      type: 'ACCOUNT_FAILURE',
      error: error.toString(),
    });
  }
  dispatch({
    type: 'ACCOUNT_FAILURE',
  });
};

export const authentificate = (
  mnemonic: string,
  hash?: string,
): ThunkAction<void, RootState, unknown, AccountActions> => async (
  dispatch,
) => {
  if (mnemonic === undefined) {
    dispatch({
      type: 'ACCOUNT_FAILURE',
      error: 'Incorrect mnemonic or public key',
      hash,
    });
    return;
  }

  Bluzelle.mnemonic = mnemonic;

  try {
    const bluzelle = new Bluzelle('buzzchat');
    const check = await bluzelle.check();
    console.log(check);
    if (check) {
      await AsyncStorage.setItem('account', mnemonic);
      dispatch({
        type: 'ACCOUNT_SUCCESS',
        payload: {
          address: Bluzelle.address,
          mnemonic,
        },
        hash,
      });
    }
  } catch (e) {
    dispatch({
      type: 'ACCOUNT_FAILURE',
      error: e,
      hash,
    });
  }
};
