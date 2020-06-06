/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import actions from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import ContactList from '../../containers/Contacts/ContactList';
import {useNavigation} from '@react-navigation/native';
import {DataScreen} from '../../components/DataScreen';

export const ContactsNewScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hash, setHash] = useState('0');

  useEffect(() => {
    const newHash = Date.now().toString();
    dispatch(actions.contacts.getList(newHash));
    setHash(newHash);
  }, []);

  const {data} = useSelector((state: RootState) => state.contacts.List);
  const status = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status,
  );

  const onSelect = (id: string) => {
    dispatch(actions.profile.addContract(id));
    navigation.navigate('ContactsList');
  };

  return (
    <DataScreen
      data={data}
      status={status}
      component={ContactList}
      onSelect={onSelect}
      onRefresh={() => dispatch(actions.profile.getProfile('r'))}
    />
  );
};
