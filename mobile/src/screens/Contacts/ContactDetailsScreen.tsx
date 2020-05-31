/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {useDispatch, useSelector} from 'react-redux';
import {getDetailsItem} from '../../store/dataloader';
import {RootState} from '../../store';
import React, {useEffect} from 'react';
import actions from '../../store/actions';
import LoadingView from '../../components/Loading';
import {ContactDetails} from '../../containers/Contacts/ContactDetails';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ContactStackParamList} from './ContactStack';
import {DataScreen} from '../../components/DataScreen';

type ContactDetailsScreenRouteProp = RouteProp<
  ContactStackParamList,
  'ContactEditScreen'
>;

export const ContactDetailsScreen: React.FC = () => {
  const route = useRoute<ContactDetailsScreenRouteProp>();
  const {id} = route.params;

  const dispatch = useDispatch();
  useEffect(() => {
  }, []);

  const contactData = getDetailsItem(
    useSelector((state: RootState) => state.contacts.Details),
    id,
  );

  console.log(contactData);

  if (contactData === undefined || contactData.data === undefined)
    return <LoadingView />;

  const {data, status} = contactData;

  return <DataScreen data={data} component={ContactDetails} status={status} />;
};
