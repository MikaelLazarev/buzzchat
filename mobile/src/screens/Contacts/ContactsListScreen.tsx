/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import actions from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import ContactList from '../../containers/Contacts/ContactList';
import {useNavigation} from '@react-navigation/native';
import {DataScreen} from '../../components/DataScreen';
import {ChatCreateDTO} from '../../core/chat';
import {STATUS} from '../../store/utils/status';
import UUIDGenerator from 'react-native-uuid-generator';
import Loading from '../../components/Loading';

const ContactsListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hash, setHash] = useState('0');
  const [isCreating, setIsCreating] = useState(false);
  const [newChatId, setNewChatId] = useState('');

  const profile = useSelector((state: RootState) => state.profile);
  const operationStatus = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status,
  );

  useEffect(() => {
    if (profile === undefined) {
      const newHash = Date.now().toString();
      dispatch(actions.profile.getProfile(newHash));
      setHash(newHash);
    }
    // dispatch(actions.chats.getList());
  }, [profile]);

  useEffect(() => {
    if (hash !== '0' && isCreating) {
      switch (operationStatus) {
        case STATUS.SUCCESS:
          navigation.navigate('Chats', {
            screen: 'ChatsList',
            params: {reroute: newChatId},
          });
          setIsCreating(false);
          break;

        case STATUS.FAILURE:
          setHash('0');
          setIsCreating(false);
        // alert("Cant submit your operation to server");
      }
    }
  }, [hash, operationStatus]);

  const onSelect = async (id: string) => {
    const chats = profile.chatsList;
    const foundChats = chats
      .filter((c) => c.isTetATetChat)
      .filter((c) => c.members.length > 1)
      // @ts-ignore
      .filter((c) => c.members[0].id === id || c.members[1].id === id);

    if (foundChats.length > 0) {
      navigation.navigate('Chats', {
        screen: 'ChatsList',
        params: {reroute: foundChats[0].id},
      });
      return;
    }

    const newID = await UUIDGenerator.getRandomUUID();
    setNewChatId(newID);
    setIsCreating(true);

    const newChat: ChatCreateDTO = {
      id: newID,
      members: [profile.id, id],
      isTetATetChat: true,
    };

    const newHash = Date.now().toString();
    dispatch(actions.chats.create(newChat, newHash));
    setHash(newHash);
  };

  if (isCreating) {
    return <Loading />;
  }

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
