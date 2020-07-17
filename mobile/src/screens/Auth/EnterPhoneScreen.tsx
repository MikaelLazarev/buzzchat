/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {UserSendCodeDTO} from '../../core/auth';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {FormPhoneView} from '../../containers/Auth/FormPhoneView';
import {operationSelector} from 'redux-data-connect';
import {commonStyles} from '../../../styles';

export const EnterPhoneScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState('');
  const [hash, setHash] = useState('0');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const operation = useSelector(operationSelector(hash));

  useEffect(() => {
    if (hash !== '0') {
      switch (operation?.status) {
        case 'STATUS.SUCCESS':
          setIsSubmitted(false);
          navigation.navigate('EnterCodeScreen', {phone});
          break;

        case 'STATUS.FAILURE':
          setHash('0');
          setIsSubmitted(false);
          Alert.alert('Oops..', operation?.error || 'Something went wrong', [
            {
              text: 'Ok',
              onPress: () => setIsSubmitted(false),
              style: 'cancel',
            },
          ]);
          break;
      }
    }
  }, [hash, operation]);

  const data: UserSendCodeDTO = {
    phone: '',
  };
  const onSubmit = (values: UserSendCodeDTO) => {
    const newHash = Date.now().toString();
    setIsSubmitted(true);
    setHash(newHash);
    setPhone(values.phone);

    // Emit data
    dispatch(actions.auth.getCode(values.phone, newHash));
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaContainer}>
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
