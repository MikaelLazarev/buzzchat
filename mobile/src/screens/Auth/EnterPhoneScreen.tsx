/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {UserSendCodeDTO} from '../../core/auth';
import {STATUS} from '../../store/utils/status';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {RootState} from '../../store';
import {FormPhoneView} from '../../containers/Auth/FormPhoneView';

export const EnterPhoneScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState('');
  const [hash, setHash] = useState('0');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const operationStatus = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status,
  );

  // TODO: Move status to new Dataloader component

  useEffect(() => {
    if (hash !== '0') {
      switch (operationStatus) {
        case STATUS.SUCCESS:
          setIsSubmitted(false);
          navigation.navigate('EnterCodeScreen', {phone});
          break;

        case STATUS.FAILURE:
          setHash('0');
          setIsSubmitted(false);
        // alert("Cant submit your operation to server");
      }
    }
  }, [hash, operationStatus]);

  const data: UserSendCodeDTO = {
    phone: '',
  };
  const onSubmit = (values: UserSendCodeDTO) => {
    console.log('SUMMMMMIT', values);

    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);
    setPhone(values.phone);

    // Emit data
    dispatch(actions.auth.getCode(values.phone, newHash));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#687882',
          marginTop: 55,
          marginBottom: 15,
        }}>
        Enter your phone
      </Text>
      <FormPhoneView
        data={data}
        onSubmit={onSubmit}
        isSubmitted={isSubmitted}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
  },
  button: {
    width: '80%',
    paddingTop: 50,
  },
  button2: {
    paddingTop: 20,
  },
});
