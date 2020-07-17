/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {ReactElement} from 'react';
import LoadingView from './Loading';
import FailureView from './Failure';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {STATUS} from 'redux-data-connect';
import {commonStyles} from "../../styles";

export interface DataScreenComponentProps<T> {
  data: T;
  onSelect?: (id: string) => void;
}

interface DataScreenProps<T> {
  data: T;
  status: STATUS;
  component: (props: DataScreenComponentProps<T>) => React.ReactNode;
  onSelect?: (id: string) => void;
  onRefresh?: () => void;
}

export function DataScreen<T>({
  data,
  status,
  component,
  onSelect,
  onRefresh,
}: DataScreenProps<T>): ReactElement {


  console.log("HI", data, status)
  switch (status) {
    default:
    case 'STATUS.LOADING':
      return <LoadingView />;

    case 'STATUS.FAILURE':
      return <FailureView error="Oops! It's a problem connecting server" />;

    case 'STATUS.UPDATING':
    case 'STATUS.SUCCESS':
      return (
        <SafeAreaView style={commonStyles.safeAreaContainer}>
          <ScrollView
            style={styles.scrollContainer}
            refreshControl={
              <RefreshControl
                refreshing={status === 'STATUS.UPDATING'}
                onRefresh={onRefresh}
              />
            }>
            {component({data, onSelect})}
          </ScrollView>
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    marginBottom: 20,
  },
});
