/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ChatsList from '../../containers/Chats/ChatsList';
import actions from '../../store/actions';
import {RootState} from '../../store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {DataScreen} from '../../components/DataScreen';
import {Chat} from '../../core/chat';
import {ChatsStackParamList} from './ChatStack';

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

  const data = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (data === undefined) {
      const newHash = Date.now().toString();
      dispatch(actions.profile.getProfile(newHash));
      setHash(newHash);
    }
    // dispatch(actions.chats.getList());
  }, [data]);

  const status = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status,
  );

  const onChatSelect = (id: string) => {
    navigation.navigate('ChatDetails', {
      id,
    });
  };

  if (reroute !== undefined) {
    onChatSelect(reroute);
  }

  const realStatus =
    hash === '0' && data !== undefined ? 'STATUS.SUCCESS' : status;

  return (
    <DataScreen<Chat[]>
      data={data.chatsList}
      status={realStatus}
      component={ChatsList}
      onSelect={onChatSelect}
      onRefresh={() => dispatch(actions.profile.getProfile('r'))}
    />
  );
};
