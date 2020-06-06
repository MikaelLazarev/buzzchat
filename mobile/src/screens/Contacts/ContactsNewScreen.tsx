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
import {STATUS} from '../../store/utils/status';

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

  const {data} = useSelector((state: RootState) => state.contacts.List);
  const operationStatus = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status,
  );

  // TODO: Move status to new Dataloader component

  useEffect(() => {
    if (hash !== '0' && isAdding) {
      switch (operationStatus) {
        case STATUS.SUCCESS:
          navigation.navigate('ContactsList');
          break;

        case STATUS.FAILURE:
          setHash('0');
        // alert("Cant submit your operation to server");
      }
    }
  }, [hash, operationStatus]);

  const onSelect = (id: string) => {
    const newHash = Date.now().toString();
    dispatch(actions.profile.addContract(id, newHash));
    setHash(newHash);
    setIsAdding(true);
  };

  return (
    <DataScreen
      data={data}
      status={operationStatus}
      component={ContactList}
      onSelect={onSelect}
      onRefresh={() => dispatch(actions.profile.getProfile('r'))}
    />
  );
};
