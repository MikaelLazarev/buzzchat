/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
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

  useEffect(() => {
    const newHash = Date.now().toString();
    dispatch(actions.chats.getDetails(id, newHash));
    setHash(newHash);
  }, []);

  const chatData = getDetailsItem(
    useSelector((state: RootState) => state.chats.Details),
    id,
  );
  const profile = useSelector((state: RootState) => state.profile);

  console.log("COPPPP", chatData, route.params);

  if (chatData === undefined || chatData.data === undefined) return <Loading />;
  const {data} = chatData;


  // navigation.setOptions({title: 'Updated!'});
  const messages = data.messages;

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
      createdAt: newMessages[0].createdAt,
      user: profile,
      pending: true,
    };
    dispatch(
      actions.chats.postMessage(
        {
          chat_id: id,
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
            _id: e.id,
            text: e.text,
            createdAt: e.createdAt,
            user: {
              _id: e.user.id,
              ...e.user,
            },
            pending: e.pending || false,
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
    <>
      <Modal isVisible={false}>
        <View style={{flex: 1}}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
      <GiftedChat
        messages={iMessages}
        onSend={onSend}
        user={{
          _id: profile.id,
          name: profile.name,
          avatar: profile.avatar,
        }}
        onLongPress={(e, msg) => onLongPress(msg)}
      />
    </>
  );
};
