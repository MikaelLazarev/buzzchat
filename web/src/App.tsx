/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Provider} from 'react-redux';

import {ThemeProvider, Text} from 'react-native-elements';
import {theme} from './styles';
import {Router} from './screens/Router';
import configureStore from './store';

// declare const global: {HermesInternal: null | {}};

const store = configureStore();

const App = () => {

    console.log(window.location.protocol + '://' + window.location.host)
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </Provider>
  );
};

export default App;

//
//         </NavigationContainer>
//       </ThemeProvider>
