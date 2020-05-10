/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import actions from '../../store/actions';

export const AccountForm: React.FC = () => {
  const [mnemonic, setMnemonic] = useState('');

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(actions.auth.authentificate(mnemonic));
  };

  const isCorrect = () => {
    const mnemonicArray = mnemonic.trim().split(' ');
    if (mnemonicArray.length !== 24) return false;
    return true;
  };

  return (
    <View style={styles.input}>
      <Text style={styles.label}>Mnemonic</Text>
      <TextInput
        onChangeText={setMnemonic}
        value={mnemonic}
        style={{fontSize: 18}}
        multiline
      />
      <Button
        title="Enter mnemonic"
        style={styles.button}
        onPress={onSubmit}
        disabled={!isCorrect()}
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

  label: {
    paddingTop: 20,
  },
  button: {
    paddingTop: 35,
  },
});
