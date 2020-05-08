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
import {ThemeProvider} from 'react-native-elements';
import {theme} from './styles';
import AuthSwitcher from './src/AuthSwitcher';
import {NavigationContainer} from '@react-navigation/native';

declare const global: {HermesInternal: null | {}};

const store = configureStore();

const App = () => {
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
