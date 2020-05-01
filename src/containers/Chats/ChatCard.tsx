import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Badge, Text} from 'react-native-elements';
import SmartAvatar from '../../components/SmartAvatar';
import {Chat} from '../../core/chat';

interface ChatCardProps {
  item: Chat;
  onPressed: (id: string) => void;
}

const ChatCard: React.FC<ChatCardProps> = ({item, onPressed}) => {
  const FolderBadge = <Text>folder_name</Text>;

  const online = (
    <View style={{flexDirection: 'row'}}>
      <Badge status="success" containerStyle={{marginTop: 3}} />
      <Text style={{fontSize: 11}}>{' Online '}</Text>
    </View>
  );

  return (
    <TouchableOpacity onPress={() => onPressed(item.id)}>
      <View style={styles.container}>
        <View style={{alignItems: 'center', padding: 0}}>
          <Text style={{fontSize: 13}}>5</Text>
        </View>
        <View style={styles.textContainer}>
          <Text h4>{item.name}</Text>
          {FolderBadge}
          {online}
        </View>
        <View style={styles.rightContainer}>
          <SmartAvatar persons={item.members} />
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
    width: '70%',
    paddingRight: 10,
    alignItems: 'stretch',
    alignContent: 'space-between',
    marginBottom: 5,
  },
  rightContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
});

export default ChatCard;
