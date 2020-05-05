/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useState} from 'react';
import {FlatList, StyleSheet, View, ScrollView} from 'react-native';
import {SearchBar, Text} from 'react-native-elements';
import ContactCard from './ContactCard';
import {Contact} from '../../core/contact';

interface ContactListProps {
  data: Contact[];
  onSelect: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({data, onSelect}) => {
  const [search, setSearch] = useState('');

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
        lightTheme={true}
        round={true}
      />

      <FlatList
        style={styles.container}
        data={data}
        renderItem={(elem) => (
          <ContactCard
            key={elem.item.id}
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
