/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import actions from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {STATUS} from '../../store/utils/status';
import LoadingView from '../../components/Loading';
import FailureView from '../../components/Failure';
import ContactList from '../../containers/Contacts/ContactList';
import {useNavigation} from '@react-navigation/native';
import {DataScreen} from '../../components/DataScreen';

const ContactsListScreen: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.contacts.getList());
  }, []);

  const {data, status} = useSelector((state: RootState) => state.contacts.List);

  const navigation = useNavigation();
  const onSelect = (id: string) => {
    navigation.navigate('ContactDetails', {
      id,
    });
  };

  return (
    <DataScreen
      data={data}
      status={status}
      component={ContactList}
      onSelect={onSelect}
    />
  );
};

export default ContactsListScreen;
