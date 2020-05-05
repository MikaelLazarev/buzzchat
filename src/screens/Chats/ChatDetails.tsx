/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import actions from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Message} from '../../core/message';
import {RootState} from '../../store';
import {getDetailsItem} from '../../store/dataloader';

export const ChatDetailsScreen: React.FC = () => {
  const chatId = '0';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.chats.getDetails());
  }, []);

  const chatData = getDetailsItem(
    useSelector((state: RootState) => state.chats.Details),
    chatId,
  );

  const messages = chatData ? chatData.data?.messages : [];

  console.log(messages);

  const onSend = (newMessages: IMessage[]) => {
    // setMessages(GiftedChat.append(messages, newMessages as any));
    dispatch(actions.chats.addMessage(chatId, newMessages[0] as Message));
  };

  const iMessages =
    messages === undefined ? [] : messages.reverse().map((e: IMessage) => e);

  return (
    <GiftedChat
      messages={iMessages}
      onSend={onSend}
      user={{
        _id: 1,
        name: 'Mool',
      }}
    />
  );
};
