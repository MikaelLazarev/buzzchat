/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import SmartAvatar from '../../components/SmartAvatar';
import {Chat} from '../../core/chat';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

interface ChatCardProps {
  data: Chat;
  onPressed: (id: string) => void;
}

const ChatCard: React.FC<ChatCardProps> = ({data, onPressed}) => {
  const profile = useSelector((state: RootState) => state.profile);

  const counterPart = data.members.filter((e) => e.id !== profile.id)[0];
  const title = data.isTetATetChat ? counterPart.name : data.name;
  return (
      <TouchableOpacity onPress={() => onPressed(data.id)}>
        <View style={styles.container}>
          {/* AVATAR CONTAINER */}
          <View style={styles.rightContainer}>
            <SmartAvatar name={counterPart.name} />
          </View>

          {/* TEXT CONTAINER */}
          <View style={styles.textContainer}>
            <Text h4>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    paddingTop: 18,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 5,
    marginTop: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  textContainer: {
    // paddingLeft: 15,
    paddingRight: 10,
    alignItems: 'stretch',
    alignContent: 'space-between',
    marginBottom: 5,
    marginTop: 0,
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  rightContainer: {
    width: 55,
    alignItems: 'center',
    marginRight: 15,
  },
});

export default ChatCard;
