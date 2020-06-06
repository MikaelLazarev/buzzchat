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
import {DataScreen} from '../../components/DataScreen';
import {Chat} from '../../core/chat';
import {STATUS} from "../../store/utils/status";

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

  const data = useSelector((state: RootState) => state.profile);
  const operData = useSelector((state: RootState) => state.operations.data[hash]);

  // @ts-ignore
  const status = operData !== undefined ? operData.data.status : STATUS.UPDATE_NEEDED;

  return (
    <DataScreen<Chat[]>
      data={data.chatsList}
      status={status}
      component={ChatsList}
      onSelect={onSelect}
    />
  );
};
