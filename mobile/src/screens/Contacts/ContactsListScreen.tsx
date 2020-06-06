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
import {ChatCreateDTO} from '../../core/chat';
import {v4 as uuidv4} from 'uuid';
import {STATUS} from "../../store/utils/status";
import UUIDGenerator from 'react-native-uuid-generator';

const ContactsListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hash, setHash] = useState('0');

  useEffect(() => {
    const newHash = Date.now().toString();
    dispatch(actions.profile.getProfile(newHash));
    setHash(newHash);
    // dispatch(actions.chats.getList());
  }, []);

  const profile = useSelector((state: RootState) => state.profile);
  const status = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status,
  );

  const onSelect = async (id: string) => {
    const chats = profile.chatsList;
    const foundChats = chats
      .filter((c) => c.isTetATetChat)
      .filter((c) => c.members.length === 2)
      .filter((c) => c.members[0].id === id || c.members[1].id === id);

    if (foundChats.length > 0) {
      navigation.navigate('Chats', {
        screen: 'ChatDetails',
        params: {id: foundChats[0].id},
      });
      return;
    }

    const newID = await UUIDGenerator.getRandomUUID();
    const newChat: ChatCreateDTO = {
      id: newID,
      members: [profile.id, id],
      isTetATetChat: true,
    };

    const newHash = Date.now().toString();
    dispatch(actions.chats.create(newChat, newHash));
    setHash(newHash);
    navigation.navigate('Chats', {
      screen: 'ChatDetails',
      params: {id: newChat.id},
    });
  };

  return (
    <DataScreen
      data={profile.contactsList || []}
      status={STATUS.SUCCESS}
      component={ContactList}
      onSelect={onSelect}
      onRefresh={() => dispatch(actions.profile.getProfile('r'))}
    />
  );
};

export default ContactsListScreen;
