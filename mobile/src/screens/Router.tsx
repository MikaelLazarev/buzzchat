/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

import {ContactStack} from './Contacts/ContactStack';
import {ChatStack} from './Chats/ChatStack';
import {SettingsStack} from './Settings/SettingsStack';

const Tab = createBottomTabNavigator();

const tabIcons: Record<string, string> = {
  Contacts: 'ios-person',
  Chats: 'ios-chatbubbles',
  Settings: 'ios-settings',
};

export const Router: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const iconName = tabIcons[route.name] || '';

          // You can return any component that you like here!
          return (
            <Icon name={iconName} size={size} color={color} type={'ionicon'} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0176f4',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Contacts" component={ContactStack} />
      <Tab.Screen name="Chats" component={ChatStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};
