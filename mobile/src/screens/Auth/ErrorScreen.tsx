/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

/**
 * HomeSceen
 * DBS Lifestyle App
 * https://github.com/MikaelLazarev/DBSLifestyle
 *
 * @format
 * @flow
 */

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Linking, View, Text, Button} from 'react-native';
import FailureView from '../../components/Failure';

class WelcomeScreen extends React.Component {
  render() {
    return (
        <FailureView error="Connection error. The internet connection appears to be offline."/>
    );
  }
}

export default WelcomeScreen;
