/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import actions from '../store/actions';
import {SplashScreen} from './Welcome/SplashScreen';
import {View} from 'react-native';
import {ChatsScreen} from './Chats/ChatsScreen';
import {actionsAfterAuth} from '../store/actions';
import {authSelector, isAuthenticatedSelector} from 'redux-data-connect';

export const Router = () => {
  const dispatch = useDispatch();
  const {status} = useSelector(authSelector);
  const isUserAuthenticated = useSelector(isAuthenticatedSelector);

  // useEffect(() => {
  //   dispatch(actions.auth.getTokenAtStartup());
  // }, []);

  useEffect(() => {
    switch (status) {
      case 'AUTH_STARTUP':
        dispatch(actions.auth.getTokenAtStartup());
        dispatch(actions.auth.getWebConnectCode())
        break;
      case 'AUTH_SUCCESS':
        dispatch(actionsAfterAuth());
        break;
    }
  }, [status]);

  switch (status) {
    default:
    case 'AUTH_REQUIRED':
    case 'AUTH_STARTUP':
      return (
        <View>
          <SplashScreen />
        </View>
      );
    case 'AUTH_SUCCESS':
      if (isUserAuthenticated) {
        return (
          <View>
            <ChatsScreen />
          </View>
        );
      } else {
        return (
          <View>
            <SplashScreen />
          </View>
        );
      }
  }
};
