/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {Button, Card, Text} from 'react-native-elements';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {UserCodeDTO, UserSendCodeDTO} from '../../core/auth';
import {STATUS} from '../../store/utils/status';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {RootState} from '../../store';
import {FormCodeView} from '../../containers/Auth/FormCodeView';
import {WelcomeStackParamList} from '../Welcome/WelcomeStack';
import {NavigationActions} from 'react-navigation';

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

  const operationStatus = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status,
  );

  // TODO: Move status to new Dataloader component

  useEffect(() => {
    if (hash !== '0') {
      switch (operationStatus) {
        case STATUS.SUCCESS:
          break;

        case STATUS.FAILURE:
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
    dispatch(actions.auth.loginWithPhone(phone, values.code, newHash));
  };

  return (
    <>
      <Modal visible={isSubmitted}>
        <View style={styles.centeredView}>
          <View
            style={{
              backgroundColor: '#c1bfbf',
              borderRadius: 10,
              width: '80%',
              height: '18%',
              opacity: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '5%',
            }}>
            <Text style={{color: 'white', fontSize: 18}}>
              Please, wait...
            </Text>
            <Text style={{color: 'white', fontSize: 18}}>
              It could take up to a minute
            </Text>
            <ActivityIndicator style={{marginTop: 20}} />
          </View>
        </View>
      </Modal>

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
        <FormCodeView
          data={data}
          onSubmit={onSubmit}
          isSubmitted={isSubmitted}
        />
      </SafeAreaView>
    </>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  button: {
    width: '80%',
    paddingTop: 50,
  },
  button2: {
    paddingTop: 20,
  },
});
