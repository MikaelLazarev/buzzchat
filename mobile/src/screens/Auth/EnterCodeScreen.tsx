/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import {RouteProp, useRoute} from '@react-navigation/native';
import {UserCodeDTO} from '../../core/auth';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {FormCodeView} from '../../containers/Auth/FormCodeView';
import {WelcomeStackParamList} from '../Welcome/WelcomeStack';
import {operationSelector} from 'redux-data-connect';
import {PleaseWaitModal} from '../../components/PleaseWaitModal';
import {commonStyles} from '../../../styles';

type EnterCodeScreenRouteProps = RouteProp<
  WelcomeStackParamList,
  'EnterCodeScreen'
>;

export const EnterCodeScreen: React.FC = () => {
  const dispatch = useDispatch();

  const route = useRoute<EnterCodeScreenRouteProps>();
  const {phone} = route.params;

  const [hash, setHash] = useState('0');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const operation = useSelector(operationSelector(hash));

  // TODO: Move status to new Dataloader component

  useEffect(() => {
    if (hash !== '0') {
      switch (operation?.status) {
        case 'STATUS.SUCCESS':
          break;

        case 'STATUS.FAILURE':
          setHash('0');
          Alert.alert('Login Failed', 'Wrong code', [
            {
              text: 'Ok',
              onPress: () => setIsSubmitted(false),
              style: 'cancel',
            },
          ]);
      }
    }
  }, [hash, operation]);

  const data: UserCodeDTO = {
    code: '',
  };
  const onSubmit = (values: UserCodeDTO) => {
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);

    // Emit data
    dispatch(actions.auth.loginByPhone(phone, values.code, newHash));
  };

  return (
    <>
      <PleaseWaitModal visible={isSubmitted} />
      <SafeAreaView style={commonStyles.safeAreaContainer}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#687882',
            marginTop: 55,
            marginBottom: 15,
          }}>
          Enter your code
        </Text>
        <FormCodeView
          data={data}
          onSubmit={onSubmit}
          isSubmitted={isSubmitted}
        />
      </SafeAreaView>
    </>
  );
};
