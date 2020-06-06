import React, {useEffect, useState} from 'react';
import {FullScreenView} from '../../components/FullScreenView';
import {Dimensions, View} from 'react-native';
import {ChatsListScreen} from './ChatsListScreen';
import {ChatDetailsScreen} from './ChatDetails';
import {Text} from 'react-native-elements';

export const ChatsScreen: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | undefined>(undefined);
  const [height, setHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(Dimensions.get('window').height);
    });
  }, []);

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
            justifyContent: 'space-between'
        }}>
        <View style={{marginLeft: '2%'}}>
          <Text h2>Buzzzchat</Text>
        </View>
          <View style={{marginRight: '2%'}}>
              <Text>
                  <a href={"http://staking.bluzelle.com/fundwallet"} target={"_new"}>Bluzelle account</a>: qdq3d3, Money: 1920930129</Text>
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
