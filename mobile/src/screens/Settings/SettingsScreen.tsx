/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {RootState} from '../../store';
import {DataScreen} from '../../components/DataScreen';
import {ProfileDetails} from '../../containers/Settings/ProfileDetails';
import {profileSelector} from '../../store/profile';

export const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [hash, setHash] = useState('0');
  useEffect(() => {
    const newHash = Date.now().toString();
    dispatch(actions.profile.getProfile(newHash));
    setHash(newHash);
    // dispatch(actions.chats.getList());
  }, []);

  const data = useSelector(profileSelector);
  const status = useSelector(
    (state: RootState) => state.operations.data[hash]?.data?.status,
  );

  return (
    <DataScreen
      data={data}
      component={ProfileDetails}
      status={hash === '0' ? 'STATUS.LOADING' : status || 'STATUS.LOADING'}
    />
  );
};
