/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import ContactsListScreen from './ContactsListScreen';
import {Button} from 'react-native-elements';
import {ContactDetailsScreen} from './ContactDetailsScreen';
import {ContactEditScreen} from './ContactEditScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

export type ContactStackParamList = {
  ContactDetailsScreen: {id: string};
};

export const ContactStack: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactsList"
        component={ContactsListScreen}
        options={{
          title: 'Contacts',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('ContactDetails')}
              icon={{
                name: 'add',
                size: 22,
              }}
              type="clear"
            />
          ),
        }}
      />
      <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} />
      <Stack.Screen name="ContactEdit" component={ContactEditScreen} />
    </Stack.Navigator>
  );
};
