/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import { SafeAreaView} from 'react-native';
import {Button,Text} from 'react-native-elements';

export const SplashScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <Text>Welcome to buzzchat</Text>
      <Button>Create account</Button>
      <Button>Enter mnenomic</Button>
    </SafeAreaView>
  );
};
