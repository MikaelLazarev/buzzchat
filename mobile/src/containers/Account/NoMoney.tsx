/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import { SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {Button,Icon, Text} from 'react-native-elements';
import React from 'react';
import {useDispatch} from 'react-redux';
import actions from '../../store/actions';

interface NoMoneyProps {
  account: string;
}

export const NoMoneyScreen: React.FC<NoMoneyProps> = ({account}) => {
  const dispatch = useDispatch();

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={styles.container}>
        <View style={styles.containerText}>
          <Icon name="logo-usd" type="ionicon" size={50} color="blue" />
          <Text h4 style={{textAlign: 'center'}}>
            No funds on account: {account}
          </Text>
          <Text h4 style={{textAlign: 'center'}}>
            Please, add funds to continue using Bluzelle Faucet
          </Text>
        </View>
        <View>
          <Button
            title={'Check'}
            onPress={() => dispatch(actions.profile.getProfile('cash'))}
          />
        </View>
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
