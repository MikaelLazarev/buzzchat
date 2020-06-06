/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import ContactsListScreen from './ContactsListScreen';
import {Button} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ContactsNewScreen} from './ContactsNewScreen';

const Stack = createStackNavigator();

export type ContactStackParamList = {
  ContactEditScreen: {id: string};
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
              onPress={() => navigation.navigate('ContactNewScreen')}
              icon={{
                name: 'add',
                size: 22,
              }}
              type="clear"
            />
          ),
        }}
      />
      <Stack.Screen
        name="ContactNewScreen"
        component={ContactsNewScreen}
        initialParams={{id: 'new'}}
        options={{
          title: 'Contacts',

        }}
      />
    </Stack.Navigator>
  );
};
