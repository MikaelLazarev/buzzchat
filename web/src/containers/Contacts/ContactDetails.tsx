/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {Contact} from '../../core/contact';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Image, Text} from 'react-native-elements';

interface ContactDetailsProps {
  data: Contact;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({data}) => {
  return (
    <View style={styles.title}>
      <Text h2 style={{margin: 10}}>
        {data.name}
      </Text>
      <Image source={{uri: data.avatar}} style={{width: 150, height: 150}} />
      <View
        style={{
          paddingTop: 10,
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.level}>Master of meetings</Text>
        <Text h4>Score: 100</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  title: {
    alignItems: 'center',
    marginBottom: 25,
  },
  level: {
    fontSize: 20,
  },
});
