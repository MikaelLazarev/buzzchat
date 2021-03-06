/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';

export const Loading: React.FC = () => (
  <>
    <StatusBar barStyle="default" />
    <SafeAreaView style={styles.container}>
      <ActivityIndicator />
    </SafeAreaView>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
  },
});

export default Loading;
