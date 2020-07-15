/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ChatsListScreen} from './ChatsListScreen';
import {ChatDetailsScreen} from './ChatDetails';
import {Button} from 'react-native-elements';
import ContactsListScreen from '../Contacts/ContactsListScreen';
import {enableScreens} from 'react-native-screens';

enableScreens();

const Stack = createNativeStackNavigator();

export type ChatsStackParamList = {
  ChatListScreen: {reroute?: string};
  ChatDetailsScreen: {id: string};
};

export const ChatStack: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatsList"
        component={ChatsListScreen}
        options={{
          title: 'Chats',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('ChatNew')}
              icon={{
                name: 'add',
                size: 22,
                color: '#0873eb',
              }}
              type="clear"
            />
          ),
          headerLargeTitle: true,
          headerBackTitleStyle: {fontFamily: 'Helvetica Neue'},
          headerLargeTitleHideShadow: true,
          headerStyle: {backgroundColor: '#F6F7F8'},
        }}
      />
      <Stack.Screen name="ChatDetails" component={ChatDetailsScreen} />
      <Stack.Screen
        name="ChatNew"
        component={ContactsListScreen}
        options={{
          title: 'Select contact',
        }}
      />
    </Stack.Navigator>
  );
};
