/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';

export const ContactQRScanScreen: React.FC = () => {
  const onSuccess = (e: Event) => {
    console.log(e);
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
