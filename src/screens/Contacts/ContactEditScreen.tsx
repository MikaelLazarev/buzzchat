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
import {STATUS} from '../../store/utils/status';
import LoadingView from '../../components/Loading';
import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {ContactForm} from '../../containers/Contacts/ContactForm';
import {DataScreen} from '../../components/DataScreen';
import {ContactStackParamList} from './ContactStack';

type ContactEditScreenRouteProp = RouteProp<
  ContactStackParamList,
  'ContactEditScreen'
>;

export const ContactEditScreen: React.FC = () => {
  const route = useRoute<ContactEditScreenRouteProp>();
  const {id} = route.params;

  console.log(id);

  const dispatch = useDispatch();
  useEffect(() => {
    if (id !== 'new') dispatch(actions.contacts.getDetails(id));
  }, [id]);

  let contactData = getDetailsItem(
    useSelector((state: RootState) => state.contacts.Details),
    id,
  );

  if (id === 'new') {
    contactData = {
      data: {
        id: '2132',
        name: '',
        avatar: '',
        pubKey: '',
      },
      status: STATUS.SUCCESS,
    };
  }

  if (contactData === undefined || contactData.data === undefined)
    return <LoadingView />;

  const {data, status} = contactData;

  return <DataScreen data={data} component={ContactForm} status={status} />;
};
