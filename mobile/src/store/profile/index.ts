/*
 * Buzzzchat - P2P Chat based on Bluzelle DB
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {RootState} from '../index';
import {Profile} from '../../core/profile';
export const namespace = 'profile';

export const profileSelector = (state: RootState) => state.profile;

export type ProfileActions = {
  type: 'PROFILE_REQUEST' | 'PROFILE_SUCCESS' | 'PROFILE_FAILURE';
  payload?: Profile;
  error?: boolean;
};
