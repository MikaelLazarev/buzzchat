/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {Theme} from 'react-native-elements';
import {StyleSheet} from 'react-native';

export const theme: Theme = {
  Avatar: {
    rounded: true,
  },
  Text: {
    h1Style: {fontSize: 32, fontWeight: 'bold', color: '#4171c3'},
    h2Style: {fontSize: 18, fontWeight: 'bold', color: 'rgba(38,50,60,1)'},
    h3Style: {fontSize: 14, color: '#757677'},
    h4Style: {fontSize: 16, fontWeight: '500'},
  },
};

export const largeTitleStyles = {
  headerLargeTitle: true,
  headerBackTitleStyle: {fontFamily: 'Helvetica Neue'},
  headerLargeTitleHideShadow: true,
  headerStyle: {backgroundColor: '#F6F7F8'},
};

export const commonStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#F6F7F8',
    alignContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  safeAreaContainerCentered: {
    flex: 1,
    backgroundColor: '#F6F7F8',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
