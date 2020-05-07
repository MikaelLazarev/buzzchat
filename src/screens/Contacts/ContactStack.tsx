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
import {ContactQRScanScreen} from './ContactQRScanScreen';

const Stack = createStackNavigator();

export type ContactStackParamList = {
  ContactDetailsScreen: {id: string};
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
          headerLeft: () => (
            <Button
              // onPress={navigation.getParam('toggleDrawer')}
              icon={{
                name: 'menu',
                size: 22,
              }}
              type="clear"
            />
          ),
          title: 'Contacts',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('ContactEdit', {id: 'new'})}
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
      <Stack.Screen
        name="ContactEdit"
        component={ContactEditScreen}
        initialParams={{id: 'new'}}
        options={{
          title: 'Contacts',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('ContactQR')}
              icon={{
                name: 'ios-qr-scanner',
                size: 22,
                type: 'ionicon',
              }}
              type="clear"
            />
          ),
        }}
      />
      <Stack.Screen name="ContactQR" component={ContactQRScanScreen} />
    </Stack.Navigator>
  );
};
