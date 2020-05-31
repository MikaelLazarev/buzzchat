/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {Profile} from '../../core/profile';
import {SettingsScreen} from './SettingsScreen';
import {ChangeNameScreen} from './ChangeNameScreen';
import {Button} from 'react-native-elements';

const Stack = createStackNavigator();

export type SettingsStackParamList = {
  ChangeNameScreen: {data: Profile};
};

export const SettingsStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="ChangeNameScreen"
        component={ChangeNameScreen}
        options={{
          title: 'Changing name',
        }}
      />
    </Stack.Navigator>
  );
};
