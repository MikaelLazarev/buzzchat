/**
 * HomeSceen
 * Wrike Meeting App
 * https://github.com/MikaelLazarev/WrikeMeeting
 *
 * @format
 * @flow
 */

/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import ChatsList from '../../containers/Chats/ChatsList';
import {STATUS} from '../../store/utils/status';
import LoadingView from '../../components/Loading';
import FailureView from '../../components/Failure';
import {NavigationScreenComponent} from 'react-navigation';
import actions from '../../store/actions';

interface ChatsListScreenProps {
  // navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  // navigationOptions?: Object;
}

const ChatsListScreen: NavigationScreenComponent<
  {},
  ChatsListScreenProps
> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.chats.getList());
  }, []);


  const chats =

  // componentDidMount() {
  //   const {navigation} = this.props;
  //   navigation.setParams({
  //     title: 'Meetings',
  //     toggleDrawer: navigation.toggleDrawer,
  //     newMeeting: () => navigation.navigate('FolderList'),
  //   });
  // }
  //
  // componentDidUpdate() {
  //   if (this.props.activeMeeting) {
  //     this.props.navigation.navigate('MeetingOnline');
  //   }
  // }
  //
  // _onStorySelected = (id) => {
  //   const {navigation} = this.props;
  //   console.log('Story', id);
  //   navigation.push('Story', {id});
  // };

  switch (this.props.status) {
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
            <ChatsList onPressed={(id) => this.props.joinMeeting(id)} />
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
  headerTitle: navigation.getParam('title'),
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
export default connect(mapStateToProps, mapDispatchToProps)(ChatsListScreen);
