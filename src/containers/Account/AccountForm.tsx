/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {RootState} from '../../store';
import {STATUS} from '../../store/utils/status';

export const AccountForm: React.FC = () => {
  const [mnemonic, setMnemonic] = useState('');

  const [hash, setHash] = useState('0');

  const dispatch = useDispatch();
  const {hashes, error} = useSelector((state: RootState) => state.auth);

  const onSubmit = () => {
    const newHash = new Date().toISOString();
    setHash(newHash);
    dispatch(actions.auth.authentificate(mnemonic, newHash));
  };

  useEffect(() => {
    if (hash !== '0') {
      switch (hashes[hash]) {
        case STATUS.SUCCESS:
          console.log('LOGIN!');
          break;
        case STATUS.FAILURE:
          setHash('0');
          break;
      }
    }
  }, [hash, hashes]);

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
      <Text style={styles.label}>{error}</Text>
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
