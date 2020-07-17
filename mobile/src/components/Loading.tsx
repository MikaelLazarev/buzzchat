/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from 'react';
import {ActivityIndicator, SafeAreaView, StatusBar} from 'react-native';
import {commonStyles} from '../../styles';

export const Loading: React.FC = () => (
  <>
    <StatusBar barStyle="default" />
    <SafeAreaView style={commonStyles.safeAreaContainerCentered}>
      <ActivityIndicator />
    </SafeAreaView>
  </>
);

export default Loading;
