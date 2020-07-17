/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {WelcomeStack} from './Welcome/WelcomeStack';

import actions, {actionsAfterAuth} from '../store/actions';
import {NoMoneyScreen} from '../containers/Account/NoMoney';
import Loading from '../components/Loading';
import {Router} from './Router';
import {authSelector, isAuthenticatedSelector} from 'redux-data-connect';
import {profileSelector} from '../store/profile';

export const AuthSwitcher: React.FC = () => {
  const {status} = useSelector(authSelector);
  const isUserAuthenticated = useSelector(isAuthenticatedSelector);
  const {amount, account} = useSelector(profileSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    switch (status) {
      case 'AUTH_STARTUP':
        dispatch(actions.auth.getTokenAtStartup());
        break;
      case 'AUTH_SUCCESS':
        dispatch(actionsAfterAuth());
        break;
    }
  }, [status]);

  switch (status) {
    default:
    case 'AUTH_STARTUP':
      return <Loading />;
    case 'AUTH_REQUIRED':
    case 'AUTH_SUCCESS':
      if (!isUserAuthenticated) {
        return <WelcomeStack />;
      }

      if (amount === 'ZERO') {
        return <NoMoneyScreen account={account} />;
      }

      return <Router />;
  }
};
