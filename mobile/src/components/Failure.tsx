/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Button, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';

interface FailureProps {
  error: string;
  reload?: () => void;
}

const FailureView: React.FC<FailureProps> = ({error, reload}) => {
  const reloadBtn =
    reload === undefined ? undefined : (
      <Button title={'Reload'} onPress={reload} />
    );

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={styles.container}>
        <View style={styles.containerText}>
          <Icon name="ios-bug" type="ionicon" size={50} color="blue" />
          <Text h4 style={{textAlign: 'center'}}>
            {error}
          </Text>
        </View>
        <View>{reloadBtn}</View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  containerText: {
    alignItems: 'center',
    alignContent: 'center',
    padding: 20,
  },
});

export default FailureView;
