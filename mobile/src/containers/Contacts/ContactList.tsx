/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useState} from 'react';
import {FlatList, StyleSheet, ScrollView} from 'react-native';
import SearchBar from 'react-native-search-bar';
import ContactCard from './ContactCard';
import {Contact} from '../../core/contact';
import {DataScreenComponentProps} from '../../components/DataScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

const ContactList: React.FC<DataScreenComponentProps<Contact[]>> = ({
  data,
  onSelect,
}) => {
  const [search, setSearch] = useState('');
  const profile = useSelector((state: RootState) => state.profile);

  const otherContactsData = data.filter((elm) => elm.id !== profile.id);
  const filteredData =
    search === ''
      ? otherContactsData
      : otherContactsData.filter((elm) => elm.name.search(search) !== -1);

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        text={search}
        searchBarStyle={'minimal'}
      />

      <FlatList
        style={{...styles.container, marginTop: 25}}
        data={filteredData}
        renderItem={(elem) => (
          <ContactCard
            key={elem.item.id}
            data={elem.item}
            selectContact={onSelect!}
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
    borderWidth: 0,

  },
  header: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
});

export default ContactList;
