/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import QRCodeScanner, {Event} from 'react-native-qrcode-scanner';
import {useDispatch} from 'react-redux';
import actions from '../../store/actions';
import {useNavigation} from '@react-navigation/native';

export const WebAuthQRScanScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSuccess = (e: Event) => {
    const qrcode = e.data as string;
    const newHash = Date.now().toString();
    dispatch(actions.auth.authWeb(qrcode, newHash));
    navigation.navigate('SettingsScreen');
  };
  return (
    // <Text>Hello!</Text>
    <QRCodeScanner
      onRead={onSuccess}
      topContent={
        <View style={styles.container}>
          <Text>Scan QR-code or enter contact automatically.</Text>
        </View>
      }
      bottomContent={
        <View style={styles.container}>
          <Button title="Scan QR-Code" />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    width: '100%',
  },
});
