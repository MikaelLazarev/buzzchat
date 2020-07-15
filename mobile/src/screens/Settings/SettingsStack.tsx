/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {Profile} from '../../core/profile';
import {SettingsScreen} from './SettingsScreen';
import {ChangeNameScreen} from './ChangeNameScreen';
import {Button} from 'react-native-elements';
import {WebAuthQRScanScreen} from './WebAuthQRScanScreen';
import {useDispatch} from 'react-redux';
import actions from '../../store/actions';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

const Stack = createNativeStackNavigator();

export type SettingsStackParamList = {
  ChangeNameScreen: {data: Profile};
};

export const SettingsStack: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerRight: () => (
            <Button
              onPress={() => dispatch(actions.auth.logout())}
              title={'Logout'}
              type="clear"
            />
          ),
          headerLargeTitle: true,
          headerBackTitleStyle: {fontFamily: 'Helvetica Neue'},
          headerLargeTitleHideShadow: true,
          headerStyle: {backgroundColor: '#F6F7F8'},
        }}
      />
      <Stack.Screen
        name="ChangeNameScreen"
        component={ChangeNameScreen}
        options={{
          title: 'Changing name',
        }}
      />
      <Stack.Screen name="WebAuthQRScreen" component={WebAuthQRScanScreen} />
    </Stack.Navigator>
  );
};
