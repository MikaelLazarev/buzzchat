/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {GiftedChat, IMessage, User} from 'react-native-gifted-chat';
import actions from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Message} from '../../core/message';
import {RootState} from '../../store';
import {getDetailsItem} from '../../store/dataloader';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {ChatsStackParamList} from './ChatStack';
import Loading from '../../components/Loading';
import Modal from 'react-native-modal';
import {View, Text, Alert} from 'react-native';
import moment from 'moment';

type ChatDetailsScreenRouteProp = RouteProp<
  ChatsStackParamList,
  'ChatDetailsScreen'
>;

export const ChatDetailsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hash, setHash] = useState('0');

  const route = useRoute<ChatDetailsScreenRouteProp>();
  const {id} = route.params;

  const [iMessages, setIMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const newHash = Date.now().toString();
    dispatch(actions.chats.getDetails(id, newHash));
    setHash(newHash);
  }, []);

  const chatData = getDetailsItem(
    useSelector((state: RootState) => state.chats.Details),
    id,
  );

  const messages = chatData?.data?.messages;

  useEffect(() => {
    if (messages === undefined) {
      setIMessages([]);
    } else {
      setIMessages(
        messages
          .sort((m1, m2) => (m1.createdAt < m2.createdAt ? 1 : -1))
          .map((e) => {
            const iMsg: IMessage = {
              _id: e.id,
              text: e.text,
              createdAt: e.createdAt,
              user: {
                _id: e.user?.id,
                ...e.user,
              },
              pending: e.pending || false,
            };
            return iMsg;
          }),
      );
    }
  }, [messages]);

  const profile = useSelector((state: RootState) => state.profile);
  if (chatData === undefined || chatData.data === undefined) return <Loading />;
  const {data} = chatData;

  const title = data.isTetATetChat
    ? data.members.filter((e) => e.id !== profile.id)[0].name
    : data.name;
  navigation.setOptions({title});

  const users: User[] = data.members.map((elm) => ({
    _id: elm.id,
    name: elm.name,
    avatar: elm.avatar,
  }));

  const onSend = (newMessages: IMessage[]) => {
    // setMessages(GiftedChat.append(messages, newMessages as any));
    const message: Message = {
      id: newMessages[0]._id.toString(),
      text: newMessages[0].text,
      createdAt: 123,
      user: profile,
      pending: true,
    };
    dispatch(
      actions.chats.postMessage(
        {
          chatId: id,
          msg: message,
        },
        '1',
      ),
    );
  };

  console.log('MESSGGAA', iMessages);

  const onLongPress = (msg: IMessage) => {
    Alert.alert(
      'Message',
      msg.text,
      [
        {
          text: 'Delete Message',
          onPress: () =>
            dispatch(
              actions.chats.deleteMessage(
                {
                  chatId: id,
                  msgId: msg._id.toString(),
                },
                'delete',
              ),
            ),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <>
      <GiftedChat
        messages={iMessages}
        onSend={onSend}
        user={{
          _id: profile.id,
          name: profile.name,
          avatar: profile.avatar,
        }}
        renderUsernameOnMessage={true}
        showAvatarForEveryMessage={true}
        onLongPress={(e, msg) => onLongPress(msg)}
      />
    </>
  );
};
