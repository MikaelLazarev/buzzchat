/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Text} from 'react-native-elements';
import {Contact} from '../../core/contact';

interface ContactCardProps {
  data: Contact;
  selectContact: (id: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  data,
  selectContact,
}) => {
  const title = data.name;

  return (
    <TouchableOpacity onPress={() => selectContact(data.id.toString())}>
      <View style={styles.container}>
        <View>
          <View style={{paddingTop: 3}}>
            <Avatar
              rounded
              source={{uri: data.avatar}}
              renderPlaceholderContent={<ActivityIndicator />}
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text h4>{title}</Text>
            <Text>{data.id}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 18,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 5,
    marginTop: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  textContainer: {
    paddingLeft: 15,
    paddingRight: 20,
    flex: 1,
    alignContent: 'flex-start',
  },
  tagContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default ContactCard;
