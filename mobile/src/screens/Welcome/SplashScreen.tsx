/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from '../../../styles';

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        ...commonStyles.safeAreaContainerCentered,
        backgroundColor: 'white',
      }}>
      <Image
        source={require('../../../logo.jpg')}
        style={{
          height: 200,
          resizeMode: 'contain',
          marginBottom: 8,
          marginTop: -40,
        }}
      />
      <Text h1>Buzzzchat</Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#687882',
          marginTop: 5,
        }}>
        Bluzelle DB messenger
      </Text>
      <View style={styles.button}>
        <Button
          title="Login / Signup"
          onPress={() => navigation.navigate('PhoneScreen')}
          type="outline"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    paddingTop: 50,
  },
});
