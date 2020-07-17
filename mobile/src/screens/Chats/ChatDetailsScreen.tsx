/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import actions from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {mapMessageToIMessage, Message} from '../../core/message';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ChatsStackParamList} from './ChatStack';
import {Alert} from 'react-native';
import {profileSelector} from '../../store/profile';
import {chatDetailsDataSelector} from '../../store/chats';
import { LoadingView } from 'rn-mobile-components';

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
  }, [id]);

  const chatData = useSelector(chatDetailsDataSelector(id));


  console.log("CHATDATA", chatData)

  const messages = chatData?.messages;

  useEffect(() => {
    if (messages === undefined) {
      setIMessages([]);
    } else {
      setIMessages(
        messages
          .sort((m1, m2) => (m1.createdAt < m2.createdAt ? 1 : -1))
          .map(mapMessageToIMessage),
      );
    }
  }, [messages]);

  const profile = useSelector(profileSelector);
  if (chatData === undefined) return <LoadingView />;

  const title = chatData.members.filter((e) => e.id !== profile.id)[0].name;
  navigation.setOptions({title});

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

  const onLongPress = (msg: IMessage) => {
    if (!msg.pending && msg.user._id === profile.id) {
      Alert.alert(
        'Message',
        msg.text,
        [
          {
            text: 'Delete Message',
            style: 'destructive',
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
    }
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
