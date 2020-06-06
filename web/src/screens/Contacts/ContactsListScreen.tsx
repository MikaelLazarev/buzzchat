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
import {DataScreen} from '../../components/DataScreen';
import {ChatCreateDTO} from '../../core/chat';
import {v4 as uuidv4} from 'uuid';
import {STATUS} from "../../store/utils/status";

const ContactsListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [hash, setHash] = useState('0');

  useEffect(() => {
    const newHash = Date.now().toString();
    dispatch(actions.profile.getProfile(newHash));
    setHash(newHash);
    // dispatch(actions.chats.getList());
  }, []);

  const data = useSelector((state: RootState) => state.profile);
  // @ts-ignore
  const status = useSelector((state: RootState) => state.operations.data[hash].data.status);

  const onSelect = async (id: string) => {
    const chats = data.chatsList;
    const foundChats = chats
      .filter((c) => c.isTetATetChat)
      .filter((c) => c.members.length === 2)
      .filter((c) => c.members[0].id === id || c.members[1].id === id);

    if (foundChats.length > 0) {
      // navigation.navigate('Chats', {
      //   screen: 'ChatDetails',
      //   params: {id: foundChats[0].id},
      // });
      return;
    }

    const newID = "11";
    const newChat: ChatCreateDTO = {
      id: newID,
      members: [data.id, id],
      isTetATetChat: true,
    };

    const newHash = Date.now().toString();
    dispatch(actions.chats.create(newChat, newHash));
    setHash(newHash);
    // navigation.navigate('Chats', {
    //   screen: 'ChatDetails',
    //   params: {id: newChat.id},
    // });
  };

  return (
    <DataScreen
      data={data.contactsList || []}
      status={STATUS.SUCCESS}
      component={ContactList}
      onSelect={onSelect}
    />
  );
};

export default ContactsListScreen;
