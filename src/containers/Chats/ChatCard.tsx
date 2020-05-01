import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Badge, Text} from 'react-native-elements';
import SmartAvatar from '../../components/SmartAvatar';
import moment from 'moment';
import {Chat} from '../../core/chat';

interface ChatCardProps {
  item: Chat;
}

const ChatCard = ({item, onPressed}) => {
  const FolderBadge =
    item.folder_id === '' ? undefined : <Text>{item.folder_name}</Text>;

  const startTime = moment(item.start_time).format('HH:mm');
  const finishTime = moment(item.finish_time).format('HH:mm');

  let online;
  const now = new Date();
  if (now > new Date(item.start_time) && !item.finished) {
    online = (
      <View style={{flexDirection: 'row'}}>
        <Badge status="success" containerStyle={{marginTop: 3}} />
        <Text style={{fontSize: 11}}>{' Online '}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={() => onPressed(item.id)}>
      <View style={styles.container}>
        <View style={{alignItems: 'center', padding: 0}}>
          <Text style={{fontSize: 13}}>{startTime}</Text>
          <Text style={{fontSize: 13, color: 'grey'}}>{finishTime}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text h4>{item.name}</Text>
          {FolderBadge}
          {online}
        </View>
        <View style={styles.rightContainer}>
          <SmartAvatar persons={item.members} prefereableId={item.owner_id} />
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
