import {RootState} from './../index';
import {Profile} from '../../core/profile';
export const namespace = 'profile';

export const profileSelector = (state: RootState) => state.profile;

export type ProfileActions = {
  type: 'PROFILE_REQUEST' | 'PROFILE_SUCCESS' | 'PROFILE_FAILURE';
  payload?: Profile;
  error?: boolean;
};
