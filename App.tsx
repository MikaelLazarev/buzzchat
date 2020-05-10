/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import './global';
import React from 'react';
import {Provider} from 'react-redux';

import configureStore from './src/store';
import {ThemeProvider} from 'react-native-elements';
import {theme} from './styles';
import AuthSwitcher from './src/AuthSwitcher';
import {NavigationContainer} from '@react-navigation/native';

import {Bluzelle} from './src/utils/getBluzelle';

Bluzelle.mnemonic =
  'apology antique such ancient spend narrow twin banner coral book iron summer west extend toddler walnut left genius exchange globe satisfy shield case rose';

const bluz = new Bluzelle('bluzelle1upsfjftremwgxz3gfy0wf3xgvwpymqx754ssu9');
bluz.getKeys().then((res) => console.log('wew' + res));

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
