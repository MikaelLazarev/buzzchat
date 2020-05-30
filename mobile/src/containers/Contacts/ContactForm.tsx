/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {Contact} from '../../core/contact';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

interface ContactFormProps {
  data: Contact;
}

export const ContactForm: React.FC<ContactFormProps> = ({data}) => {

  const [surname, setSurname] = useState(data.name);

  return (
    <View style={styles.input}>
      <TextInput
        onChangeText={setSurname}
        value={surname}
        style={{fontSize: 18}}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F6F7F8',
  },
  header: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  input: {
    // width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 30,
    paddingLeft: 20,
    paddingRight: 15,
    paddingTop: 0,
    paddingBottom: 25,
  },
});
