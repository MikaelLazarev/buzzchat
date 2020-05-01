import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingView from '../../components/Loading';
import { STATUS } from '../../store/utils/status';


const AuthSwitcherScreen = () => {
  // Check next action based on refreshToken
  // useEffect(() => {
  //   AsyncStorage.getItem('refreshToken').then(savedRefreshToken => {
  //     if (savedRefreshToken) {
  //       console.log(
  //         '[AuthLoadingScreen]: Restore refreshToken from AsyncStorage',
  //       );
  //       refreshToken(savedRefreshToken);
  //       return;
  //     } else {
  //       navigation.navigate('LoginScreen');
  //     }
  //   });
  // }, [navigation, refreshToken]);
  //
  // // Swith screens depends on status of refresh token auth
  // useEffect(() => {
  //   switch (tokenStatus) {
  //     case STATUS.FAILURE:
  //       navigation.navigate('LoginScreen');
  //       return;
  //     case STATUS.SUCCESS:
  //       navigation.navigate('OnboardingStack');
  //       return;
  //   }
  // }, [tokenStatus]);

  return <LoadingView />;
};

export default AuthSwitcherScreen;
