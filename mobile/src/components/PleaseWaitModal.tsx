/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import React from 'react';

interface PleaseWaitModalProps {
  visible: boolean;
}

export const PleaseWaitModal: React.FC<PleaseWaitModalProps> = ({visible}) => (
  <Modal visible={visible}>
    <View style={styles.centeredView}>
      <View style={styles.card}>
        <Text style={styles.text}>Please, wait...</Text>
        <Text style={styles.text}>It could take up to a minute</Text>
        <ActivityIndicator style={{marginTop: 20}} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  card: {
    backgroundColor: '#c1bfbf',
    borderRadius: 10,
    width: '80%',
    height: '18%',
    opacity: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  text: {color: 'white', fontSize: 18},
});
