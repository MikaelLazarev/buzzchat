/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {Provider} from 'react-redux';

import configureStore from './src/store';
import {ThemeProvider} from 'react-native-elements';
import {theme} from './styles';
import {AuthSwitcher} from './src/AuthSwitcher';
import {NavigationContainer} from '@react-navigation/native';

// declare const global: {HermesInternal: null | {}};

const store = configureStore();

const App = () => {
  useEffect(() => {
    DeviceEventEmitter.addListener('WakeUpApp', () => {
      console.log('WakeUPPPP');
    });
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AuthSwitcher />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
