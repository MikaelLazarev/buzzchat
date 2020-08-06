/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ChatsList} from '../../containers/Chats/ChatsList';
import actions from '../../store/actions';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Chat} from '../../core/chat';
import {ChatsStackParamList} from './ChatStack';
import {operationSelector} from 'redux-data-connect';
import {profileSelector} from '../../store/profile';
import {DataScreen} from 'rn-mobile-components';

type ChatsListScreenRouteProp = RouteProp<
  ChatsStackParamList,
  'ChatListScreen'
>;

export const ChatsListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hash, setHash] = useState('0');

  const route = useRoute<ChatsListScreenRouteProp>();
  const reroute = route.params?.reroute;

  const data = useSelector(profileSelector);



  useEffect(() => {
    if (data === undefined) {
      const newHash = Date.now().toString();
      dispatch(actions.profile.getProfile(newHash));
      setHash(newHash);
    }
  }, [data]);

  const operation = useSelector(operationSelector(hash));

  const onChatSelect = (id: string) => {
    navigation.navigate('ChatDetails', {
      id,
    });
  };

  if (reroute !== undefined) {
    onChatSelect(reroute);
  }

  const status =
    hash === '0' && data !== undefined
      ? 'STATUS.SUCCESS'
      : operation?.status || 'STATUS.LOADING';

  return (
    <DataScreen<Chat[]>
      data={data.chatsList}
      status={status}
      component={ChatsList}
      onSelect={onChatSelect}
      onRefresh={() => dispatch(actions.profile.getProfile(''))}
    />
  );
};
