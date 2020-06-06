import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';

export interface FullScreenViewProps {
    style?: object

}

export const FullScreenView: React.FC<FullScreenViewProps> = ({style, children}) => {
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(Dimensions.get('window').height);
      setWidth(Dimensions.get('window').width);
    });
  }, []);

  return (
    <View
      style={{
        width,
        height,
        ...style
      }}>
      {children}
    </View>
  );
};
