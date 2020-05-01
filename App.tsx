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
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import configureStore from './src/store';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, ThemeProvider} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {theme} from './styles';
import Screen from './src/screens/SettingsScreen/TasksScreen';
import ContactsListScreen from './src/screens/ContactsListScreen/ContactsListScreen';
import ChatsListScreen from './src/screens/ChatsListScreen/ChatsListScreen';

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

                    if (route.name === 'Bot') {
                      iconName = focused
                          ? 'ios-information-circle'
                          : 'ios-information-circle-outline';
                    } else if (route.name === 'Tasks') {
                      iconName = focused ? 'ios-list-box' : 'ios-list';
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
              <Tab.Screen name="Tasks" component={TasksScreen} />
              <Tab.Screen name="Bot" component={ContactsListScreen} />
              <Tab.Screen name="Today" component={ChatsListScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
  );
};

export default App;
