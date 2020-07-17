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
import {DataScreen} from "rn-mobile-components";

export const ContactsNewScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hash, setHash] = useState('0');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const newHash = Date.now().toString();
    dispatch(actions.contacts.getList(newHash));
    setHash(newHash);
  }, []);

  const {data} = useSelector(contactsSelector);
  const operation = useSelector(operationSelector(hash));

  console.log(hash, data, operation);
  // TODO: Move status to new Dataloader component

  useEffect(() => {
    if (hash !== '0' && isAdding) {
      switch (operation?.status) {
        case 'STATUS.SUCCESS':
          navigation.navigate('ContactsList');
          break;

        case 'STATUS.FAILURE':
          setHash('0');
        // alert("Cant submit your operation to server");
      }
    }
  }, [hash, operation]);

  const onSelect = (id: string) => {
    const newHash = Date.now().toString();
    dispatch(actions.profile.addContract(id, newHash));
    setHash(newHash);
    setIsAdding(true);
  };

  return (
    <DataScreen
      data={data}
      status={operation?.status || 'STATUS.LOADING'}
      component={ContactList}
      onSelect={onSelect}
      onRefresh={() => dispatch(actions.profile.getProfile(''))}
    />
  );
};
