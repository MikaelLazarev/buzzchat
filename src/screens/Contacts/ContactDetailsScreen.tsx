/*
 *  Buzz Chat - Spam-free decentralized chat
 *
 *  https://github.com/MikaelLazarev/buzzchat
 *  Copyright (c) 2020. Mikhail Lazarev
 */

import {useDispatch, useSelector} from 'react-redux';
import {getDetailsItem} from '../../store/dataloader';
import {RootState} from '../../store';
import React, {useEffect} from 'react';
import actions from '../../store/actions';
import {STATUS} from '../../store/utils/status';
import LoadingView from '../../components/Loading';
import FailureView from '../../components/Failure';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {ContactDetails} from '../../containers/Contacts/ContactDetails';
import {Button} from 'react-native-elements';
import {ChatsListScreen} from '../Chats/ChatsListScreen';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ContactStackParamList} from './ContactStack';

type ContactDetailsScreenRouteProp = RouteProp<
  ContactStackParamList,
  'ContactDetailsScreen'
>;

export const ContactDetailsScreen: React.FC = () => {
  const route = useRoute<ContactDetailsScreenRouteProp>();
  const {id} = route.params;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.contacts.getDetails());
  }, []);

  const contactData = getDetailsItem(
    useSelector((state: RootState) => state.contacts.Details),
    id,
  );

  console.log(contactData);

  if (contactData === undefined || contactData.data === undefined)
    return <LoadingView />;

  const {data, status} = contactData;

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
            <ContactDetails data={data} />
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

ChatsListScreen.navigationOptions = ({navigation}) => ({
  headerTitle: 'Chats',
  headerLeft: (
    <Button
      onPress={navigation.getParam('toggleDrawer')}
      icon={{
        name: 'menu',
        size: 22,
      }}
      type="clear"
    />
  ),
  headerRight: (
    <Button
      onPress={navigation.getParam('newMeeting')}
      icon={{
        name: 'add',
        size: 22,
      }}
      type="clear"
    />
  ),
  headerStyle: {
    backgroundColor: '#F6F7F8',
  },
});
