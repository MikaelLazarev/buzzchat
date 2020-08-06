/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import actions from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {ContactList} from '../../containers/Contacts/ContactList';
import {useNavigation} from '@react-navigation/native';
import {contactsSelector} from '../../store/contacts';
import {operationSelector} from 'redux-data-connect';
import {DataScreen} from 'rn-mobile-components';

export const ContactsNewScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hashGet, setGetHash] = useState('0');
  const [hashAdd, setAddHash] = useState('0');

  const getProfile = () => {
    const newHash = Date.now().toString();
    dispatch(actions.contacts.getList(newHash));
    setGetHash(newHash);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const {data} = useSelector(contactsSelector);
  const operationGet = useSelector(operationSelector(hashGet));
  const operationAdd = useSelector(operationSelector(hashAdd));

  // TODO: Move status to new Dataloader component

  useEffect(() => {
    if (hashAdd !== '0') {
      switch (operationAdd?.status) {
        case 'STATUS.SUCCESS':
          setAddHash('0');
          setTimeout(() => navigation.navigate('ContactsList'), 500);
          break;

        case 'STATUS.FAILURE':
          setAddHash('0');
        // alert("Cant submit your operation to server");
      }
    }
  }, [operationAdd]);

  const onSelect = (id: string) => {
    const newHash = Date.now().toString();
    dispatch(actions.profile.addContract(id, newHash));
    setAddHash(newHash);
  };

  return (
    <DataScreen
      data={data}
      status={operationGet?.status}
      component={ContactList}
      onSelect={onSelect}
      onRefresh={() => getProfile()}
    />
  );
};
