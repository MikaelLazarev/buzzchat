/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Image, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../logo.png')}
        style={{
          height: 200,
          resizeMode: 'contain',
          marginBottom: 8,
          marginTop: -40,
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
      <View style={styles.button}>
        <Button
          title="Login / Signup"
          onPress={() => navigation.navigate('PhoneScreen')}
        />
      </View>
      <View style={styles.button2}>
        <Button
          title="Take a tour"
          onPress={() => navigation.navigate('EnterMnemonicScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    paddingTop: 50,
  },
  button2: {
    width: '80%',
    marginTop: 20,
  },
});
