/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ChatsList from '../../containers/Chats/ChatsList';
import actions from '../../store/actions';
import {RootState} from '../../store';
import {useNavigation} from '@react-navigation/native';
import {DataScreen} from '../../components/DataScreen';
import {Chat} from '../../core/chat';

export const ChatsListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hash, setHash] = useState('0');

  useEffect(() => {
    const newHash = Date.now().toString();
    dispatch(actions.profile.getProfile(newHash));
    setHash(newHash);
    // dispatch(actions.chats.getList());
  }, []);

  const data = useSelector((state: RootState) => state.profile);
  const status = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status,
  );

  const onChatSelect = (id: string) => {
    navigation.navigate('ChatDetails', {
      id,
    });
  };

  return (
    <DataScreen<Chat[]>
      data={data.chatsList}
      status={status}
      component={ChatsList}
      onSelect={onChatSelect}
    />
  );
};
