/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {UserCodeDTO, UserSendCodeDTO} from '../../core/auth';
import {STATUS} from '../../store/utils/status';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {RootState} from '../../store';
import {FormCodeView} from '../../containers/Auth/FormCodeView';
import {WelcomeStackParamList} from '../Welcome/WelcomeStack';

type EnterCodeScreenRouteProps = RouteProp<
  WelcomeStackParamList,
  'EnterCodeScreen'
>;

export const EnterCodeScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute<EnterCodeScreenRouteProps>();
  const {phone} = route.params;

  const [hash, setHash] = useState('0');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const operationStatus = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status,
  );

    console.log("PHONE", phone)
  // TODO: Move status to new Dataloader component

  useEffect(() => {
    if (hash !== '0') {
      switch (operationStatus) {
        case STATUS.SUCCESS:
          break;

        case STATUS.FAILURE:
          setHash('0');
          setIsSubmitted(false);
        // alert("Cant submit your operation to server");
      }
    }
  }, [hash, operationStatus]);

  const data: UserCodeDTO = {
    code: '',
  };
  const onSubmit = (values: UserCodeDTO) => {
    console.log('SUMMMMMIT', values);

    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);

    // Emit data
    dispatch(actions.auth.loginWithPhone(phone, values.code));
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
        Enter your code
      </Text>
      <FormCodeView data={data} onSubmit={onSubmit} isSubmitted={isSubmitted} />
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
