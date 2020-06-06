/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {Container, Row, Col} from 'react-bootstrap';
import {FullScreenView} from '../../components/FullScreenView';
import {RootState} from '../../store';
import QRCode from 'qrcode.react';

export const SplashScreen: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.auth.getWebConnectCode());
  }, []);

  const code = useSelector((state: RootState) => state.auth.webcode);
  const container: StyleProp<ViewStyle> = {
    width: '50%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <FullScreenView
      style={{
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <View style={container}>
        <Image
          source={require('../../logo.png')}
          style={{
            height: 200,
            width: 200,
            resizeMode: 'contain',
            marginBottom: 8,
          }}
        />

        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#687882',
            marginTop: 5,
          }}>
          Spam-free real anonymous messanger
        </Text>
      </View>
      <View style={container}>
        <Text h1>To use BuzzzChat on your computer:</Text>
        <Text h3>1. Open Buzzzchat on your phone</Text>
        <Text h3>2. Tap 'Settings' and Select 'Connect Web'</Text>
        <Text h3>3. Point your phone to this screen to capture the code</Text>
        <QRCode value={code || ''} />
      </View>
    </FullScreenView>
  );
};
