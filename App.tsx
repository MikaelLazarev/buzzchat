/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';

import configureStore from './src/store';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, Icon, ThemeProvider} from 'react-native-elements';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {theme} from './styles';
import {ChatsListScreen} from './src/screens/Chats/ChatsListScreen';
import SettingsScreen from './src/screens/Settings/SettingsScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {ChatDetailsScreen} from './src/screens/Chats/ChatDetails';
import {ContactStack} from './src/screens/Contacts/ContactStack';
import {ChatStack} from './src/screens/Chats/ChatStack';

declare const global: {HermesInternal: null | {}};

const store = configureStore();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName = 'ios-information-circle';

                switch (route.name) {
                  case 'Contacts':
                    iconName = focused ? 'ios-person' : 'ios-person';
                    break;

                  case 'Chats':
                    iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles';
                    break;

                  case 'Settings':
                    iconName = focused ? 'ios-settings' : 'ios-settings';
                    break;
                }

                // You can return any component that you like here!
                return (
                  <Icon
                    name={iconName}
                    size={size}
                    color={color}
                    type={'ionicon'}
                  />
                );
              },
            })}
            tabBarOptions={{
              activeTintColor: '#0176f4',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Contacts" component={ContactStack} />
            <Tab.Screen name="Chats" component={ChatStack} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
