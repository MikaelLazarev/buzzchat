/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import actions from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {STATUS} from '../../store/utils/status';
import LoadingView from '../../components/Loading';
import FailureView from '../../components/Failure';
import ContactList from '../../containers/Contacts/ContactList';
import {useNavigation} from '@react-navigation/native';
import {NavigationScreenComponent} from 'react-navigation';

interface ContactsListScreenProps {}

const ContactsListScreen: NavigationScreenComponent<
  {},
  ContactsListScreenProps
> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.contacts.getList());
  }, []);

  const {data, status} = useSelector((state: RootState) => state.contacts.List);

  const navigation = useNavigation();
  const onSelect = (id: string) => {
    navigation.navigate('ContactDetails', {
      id,
    });
  };

  switch (status) {
    default:
    case STATUS.LOADING:
      return <LoadingView />;

    case STATUS.FAILURE:
      return <FailureView error="Oops! It's a problem connecting server" />;

    case STATUS.UPDATING:
    case STATUS.SUCCESS:
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollContainer}>
            <ContactList data={data} onSelect={onSelect} />
          </ScrollView>
        </SafeAreaView>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    width: '100%',
    marginBottom: 20,
  },
});


export default ContactsListScreen;
