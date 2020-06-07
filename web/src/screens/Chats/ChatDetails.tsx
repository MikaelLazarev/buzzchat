/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {GiftedChat, IMessage, User} from 'react-web-gifted-chat';
import actions from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Message} from '../../core/message';
import {RootState} from '../../store';
import {getDetailsItem} from '../../store/dataloader';
import Loading from '../../components/Loading';
import {View, Alert} from 'react-native';
import {Text} from 'react-native-elements';

interface ChatDetailsScreenProps {
  id: string | undefined;
}

export const ChatDetailsScreen: React.FC<ChatDetailsScreenProps> = ({id}) => {
  const dispatch = useDispatch();
  const [hash, setHash] = useState('0');

  useEffect(() => {
    if (id !== undefined) {
      const newHash = Date.now().toString();
      dispatch(actions.chats.getDetails(id, newHash));
      setHash(newHash);
    }
  }, [id]);

  const chatData = getDetailsItem(
    useSelector((state: RootState) => state.chats.Details),
    id || '0',
  );
  const profile = useSelector((state: RootState) => state.profile);

  if (id === undefined)
    return (
      <View style={{width: '100%', height: '70%', alignItems: 'center', justifyContent: 'center'}}>
        <Text h2>Please, select a chat in the left list</Text>
      </View>
    );

  if (chatData === undefined || chatData.data === undefined) return <Loading />;
  const {data} = chatData;



  const messages = data.messages;

  const users: User[] = data.members.map((elm) => ({
    _id: elm.id,
    id: elm.id,
    name: elm.name,
    avatar: elm.avatar,
  }));

  const onSend = (newMessages: IMessage[]) => {
    // setMessages(GiftedChat.append(messages, newMessages as any));
    const message: Message = {
      id: newMessages[0].id.toString(),
      text: newMessages[0].text,
      createdAt: newMessages[0].createdAt,
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

  const iMessages =
    messages === undefined
      ? []
      : messages.reverse().map((e) => {
          const iMsg: IMessage = {
            id: e.id,
            text: e.text,
            createdAt: e.createdAt,
            user: {
              ...e.user,
            },
            // pending: e.pending || false,
          };
          return iMsg;
        });

  console.log('MESSGGAA', iMessages);

  const onLongPress = (msg: IMessage) => {
    Alert.alert(
      'Message',
      msg.text,
      [
        {
          text: 'Delete Message',
          onPress: () => console.log('Ask me later pressed'),
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
    <View style={{width: '100%', height: '100%'}}>
      <GiftedChat
        messages={iMessages}
        onSend={onSend}
        user={{
          id: profile.id,
          name: profile.name,
          avatar: profile.avatar,
        }}
        onLongPress={(e, msg) => onLongPress(msg)}
      />
    </View>
  );
};
