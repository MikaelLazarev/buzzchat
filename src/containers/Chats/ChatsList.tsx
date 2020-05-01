import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import ChatCard from './ChatCard';
import {Chat} from '../../core/chat';

interface ChatsListProps {
  chats: readonly Chat[];
  onPressed: (id: string) => void;
}

const ChatsList: React.FC<ChatsListProps> = ({chats, onPressed}) => {
  if (chats.length === 0) {
    return (
      <View style={{paddingLeft: 20, paddingTop: 25}}>
        <Text h2>There is no chats yet.</Text>
        <Text h4>Press '+' to add a new one.</Text>
      </View>
    );
  }

  const renderItem = (info: ListRenderItemInfo<Chat>) => (
    <ChatCard key={info.item.id} item={info.item} onPressed={onPressed} />
  );

  return (
    <FlatList
      // styles={styles.container}
      data={chats}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id + index}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 4,
  },
});

export default ChatsList;
