/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {STATUS} from '../../store/utils/status';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {RootState} from '../../store';
import {SettingsStackParamList} from './SettingsStack';
import {ProfileChangeNameDTO} from '../../core/profile';
import {FormChangeNameView} from '../../containers/Settings/FormNameView';

type ChangeNameScreenRouteProps = RouteProp<
  SettingsStackParamList,
  'ChangeNameScreen'
>;

export const ChangeNameScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute<ChangeNameScreenRouteProps>();
  const {data} = route.params;

  const [hash, setHash] = useState('0');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const status = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status,
  );

  const error = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.error,
  );

  // TODO: Move status to new Dataloader component

  useEffect(() => {
    if (hash !== '0') {
      switch (status) {
        case STATUS.SUCCESS:
          navigation.navigate('SettingsScreen');
          break;

        case STATUS.FAILURE:
          setHash('0');
          setIsSubmitted(false);
          console.log(error);
        // alert("Cant submit your operation to server");
      }
    }
  }, [hash, status]);

  const onSubmit = (values: ProfileChangeNameDTO) => {
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);

    data.name = values.name;
    // Emit data
    dispatch(actions.profile.updateProfile(data, newHash));
  };

  console.log(data);

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
        Change your public name
      </Text>
      <FormChangeNameView
        data={{name: data.name}}
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
