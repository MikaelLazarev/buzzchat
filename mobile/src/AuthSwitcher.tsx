/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
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

import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootState} from './store';
import {Icon} from 'react-native-elements';

import {ContactStack} from './screens/Contacts/ContactStack';
import {ChatStack} from './screens/Chats/ChatStack';
import {WelcomeStack} from './screens/Welcome/WelcomeStack';
import {SettingsStack} from './screens/Settings/SettingsStack';

import actions from './store/actions';
import {STATUS} from './store/utils/status';
import {NoMoneyScreen} from './containers/Account/NoMoney';
import Loading from './components/Loading';

const Tab = createBottomTabNavigator();

const tabIcons: Record<string, string> = {
  Contacts: 'ios-person',
  Chats: 'ios-chatbubbles',
  Settings: 'ios-settings',
};

export const AuthSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.auth.getTokenAtStartup());
  }, []);

  const {status} = useSelector((state: RootState) => state.auth);
  const {amount, account} = useSelector((state: RootState) => state.profile);

  switch (status) {
    default:
    case STATUS.STARTUP:
      return <Loading />;
    case STATUS.LOADING:
    case STATUS.FAILURE:
      return <WelcomeStack />;
    case STATUS.SUCCESS:
      if (amount === 'ZERO') {
        return <NoMoneyScreen account={account} />;
      }

      return (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              const iconName = tabIcons[route.name] || '';

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
          <Tab.Screen name="Settings" component={SettingsStack} />
        </Tab.Navigator>
      );
  }
};
