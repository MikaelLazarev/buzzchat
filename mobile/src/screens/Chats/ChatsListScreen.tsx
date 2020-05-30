/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

/**
 * HomeSceen
 * Wrike Meeting App
 * https://github.com/MikaelLazarev/WrikeMeeting
 *
 * @format
 * @flow
 */

/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-elements';
import ChatsList from '../../containers/Chats/ChatsList';
import {NavigationScreenComponent} from 'react-navigation';
import actions from '../../store/actions';
import {RootState} from '../../store';
import {useNavigation} from '@react-navigation/native';
import {DataScreen} from '../../components/DataScreen';
import {Chat} from '../../core/chat';

interface ChatsListScreenProps {
  // navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  // navigationOptions?: Object;
}

export const ChatsListScreen: NavigationScreenComponent<
  {},
  ChatsListScreenProps
> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.chats.getList());
  }, []);

  const {data, status} = useSelector((state: RootState) => state.chats.List);

  const navigation = useNavigation();
  const onChatSelect = (id: string) => {
    navigation.navigate('ChatDetails', {
      id,
    });
  };

  return (
    <DataScreen<Chat[]>
      data={data}
      status={status}
      component={ChatsList}
      onSelect={onChatSelect}
    />
  );
};
