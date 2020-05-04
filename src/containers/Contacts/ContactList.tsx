/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {FlatList, StyleSheet, View, ScrollView} from 'react-native';
import {Text} from 'react-native-elements';
import ContactCard from './ContactCard';
import {Contact} from '../../core/contact';

interface ContactListProps {
  data: Contact[];
  onSelect: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({data, onSelect}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text h3>MEMBERS: {data.length}</Text>
      </View>
      <FlatList
        style={styles.container}
        data={data}
        renderItem={(elem) => (
          <ContactCard
            key={elem.item._id}
            data={elem.item}
            selectContact={onSelect}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  header: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
});

export default ContactList;
