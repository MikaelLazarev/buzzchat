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
): ThunkAction<void, RootState, unknown, AccountActions> => async (
  dispatch,
) => {
  if (mnemonic === undefined) {
    dispatch({
      type: 'ACCOUNT_FAILURE',
      error: 'Incorrect mnemonic or public key',
    });
    return;
  }

  Bluzelle.mnemonic = mnemonic;

  const bluzelle = new Bluzelle(Bluzelle.address);
  const check = bluzelle.check();
  if (check) {
    await AsyncStorage.setItem('account', JSON.stringify(mnemonic));
    dispatch({
      type: 'ACCOUNT_SUCCESS',
      payload: {
        address: Bluzelle.address,
        mnemonic: mnemonic,
      },
    });
  }
  return;
};
