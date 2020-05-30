/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SplashScreen} from './SplashScreen';
import {EnterPhoneScreen} from '../Auth/EnterPhoneScreen';
import {EnterCodeScreen} from '../Auth/EnterCodeScreen';

const Stack = createStackNavigator();

export type WelcomeStackParamList = {
  EnterCodeScreen: {phone: string};
};

export const WelcomeStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="PhoneScreen" component={EnterPhoneScreen} />
      <Stack.Screen name="EnterCodeScreen" component={EnterCodeScreen} />
    </Stack.Navigator>
  );
};
