/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ChatsList from '../../containers/Chats/ChatsList';
import actions from '../../store/actions';
import {RootState} from '../../store';
import {DataScreen} from '../../components/DataScreen';
import {Chat} from '../../core/chat';
import {profileSelector} from "../../store/profile";
import {operationSelector} from "redux-data-connect";

export interface ChatsListScreenProps {
  onSelect: (id: string) => void;
}


export const ChatsListScreen: React.FC<ChatsListScreenProps> = ({onSelect}) => {
  const dispatch = useDispatch();
  const [hash, setHash] = useState('0');

  useEffect(() => {
    const newHash = Date.now().toString();
    dispatch(actions.profile.getProfile(newHash));
    setHash(newHash);
    // dispatch(actions.chats.getList());
  }, []);

  const data = useSelector(profileSelector);
  const operation = useSelector(operationSelector(hash));

  return (
    <DataScreen<Chat[]>
      data={data.chatsList}
      status={operation? operation.status : 'STATUS.LOADING'}
      component={ChatsList}
      onSelect={onSelect}
    />
  );
};
