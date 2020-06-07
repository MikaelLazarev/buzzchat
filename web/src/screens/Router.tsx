/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect} from 'react';

import {Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../store/actions';
import {RootState} from '../store';
import {SplashScreen} from './Welcome/SplashScreen';
import {View} from "react-native";
import {STATUS} from "../store/utils/status";
import {ChatsListScreen} from "./Chats/ChatsListScreen";
import {ChatsScreen} from "./Chats/ChatsScreen";

export const Router = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.auth.getTokenAtStartup());
    }, []);

    const {status} = useSelector((state: RootState) => state.auth);


    switch (status) {
        default:
        case STATUS.LOADING:
        case STATUS.FAILURE:
            return <View><SplashScreen /></View>;
        case STATUS.SUCCESS:
            return <View><ChatsScreen /></View>

  }
};
