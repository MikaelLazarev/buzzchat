import React, {useEffect, useState} from 'react';
import {FullScreenView} from '../../components/FullScreenView';
import {Button, Dimensions, View} from 'react-native';
import {ChatsListScreen} from './ChatsListScreen';
import {ChatDetailsScreen} from './ChatDetails';
import {Text} from 'react-native-elements';
import actions from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";

export const ChatsScreen: React.FC = () => {
    const dispatch = useDispatch();
  const [activeChat, setActiveChat] = useState<string | undefined>(undefined);
  const [height, setHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(Dimensions.get('window').height);
    });
  }, []);

    const {account, amount} = useSelector((state: RootState) => state.profile);

  return (
    <FullScreenView>
      <View
        style={{
          width: '100%',
          height: 40,
          backgroundColor: 'rgba(2,175,255,0.67)',
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{marginLeft: '2%'}}>
          <Text h2>Buzzzchat</Text>
        </View>
        <View style={{marginRight: '2%'}}>
          <Text>
              Bluzelle account: <strong> {account + ' '}</strong>
              Amount: <strong>{amount+ ' '}</strong>
              <Button title={'Refund'} onPress={() => { window.location.assign('http://staking.bluzelle.com/fundwallet') }} />
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', height: height - 40}}>
        <View style={{width: '30%'}}>
          <ChatsListScreen onSelect={setActiveChat} />
        </View>
        <View style={{width: '70%'}}>
          <ChatDetailsScreen id={activeChat} />
        </View>
      </View>
    </FullScreenView>
  );
};
