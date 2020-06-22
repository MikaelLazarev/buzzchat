/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Image, ListItem, Text} from 'react-native-elements';
import {Profile} from '../../core/profile';
import {useNavigation} from '@react-navigation/native';

interface ProfileDetailsProps {
  data: Profile;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({data}) => {
  const navigation = useNavigation();
  const list = [
    {
      title: 'Change name',
      icon: 'edit',
      action: () => navigation.navigate('ChangeNameScreen', {data}),
    },
    // {
    //   title: 'Change avatar',
    //   icon: 'camera',
    //   action: () => {
    //     console.log('QQ');
    //   },
    // },
    {
      title: 'Connect web',
      icon: 'desktop-windows',
      action: () => navigation.navigate('WebAuthQRScreen'),
    },
  ];

  const title = data.name
    .split('')
    .filter((e) => e >= 'A' && e <= 'Z')
    .splice(0, 2)
    .join('');

  console.log(title);
  return (
    <>
      <View style={styles.title}>
        <Text h2 style={{margin: 10}}>
          {data.name}
        </Text>
        <Avatar
          title={title}
          size={'xlarge'}
          style={{width: 150, height: 150}}
        />
        <View
          style={{
            paddingTop: 10,
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text h4>Contacts: {data.contactsList.length}</Text>
          <Text h4>Chats: {data.chatsList.length}</Text>
          <Text h4>Account:</Text>
          <Text>{data.account}</Text>
          <Text h4>Amount: {data.amount}</Text>
        </View>
      </View>
      <View>
        {list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={{name: item.icon}}
            bottomDivider
            chevron
            onPress={item.action}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  title: {
    alignItems: 'center',
    marginBottom: 25,
  },
  level: {
    fontSize: 20,
  },
});
