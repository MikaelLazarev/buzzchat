/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ChatsListScreen} from './ChatsListScreen';
import {ChatDetailsScreen} from './ChatDetails';

const Stack = createStackNavigator();

export type ContactStackParamList = {
  ContactDetailsScreen: {id: string};
};

export const ChatStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatsList"
        component={ChatsListScreen}
        options={{
          title: 'Chats',
        }}
      />
      <Stack.Screen name="ChatDetails" component={ChatDetailsScreen} />
    </Stack.Navigator>
  );
};
