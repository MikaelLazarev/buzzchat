import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {RootState} from '../index';
import {updateStatus} from '../operations/actions';
import {createAction} from 'redux-api-middleware';
import {STATUS} from '../utils/status';
import {endpoint} from './index';
import {getFullAPIAddress} from '../utils/api';
import {withAuth} from '../auth';
import {Profile} from '../../core/profile';

export const getProfile = (
  hash?: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  dispatch(updateStatus(hash || '0', STATUS.LOADING));

  const action = await dispatch(
    createAction({
      endpoint: getFullAPIAddress(endpoint),
      method: 'GET',
      headers: withAuth({'Content-Type': 'application/json'}),
      types: ['PROFILE_REQUEST', 'PROFILE_SUCCESS', 'PROFILE_FAILURE'],
    }),
  );

  if (action === undefined || action.error) {
    dispatch(updateStatus(hash || '0', STATUS.FAILURE, action.payload.message));
  } else {
    dispatch(updateStatus(hash || '0', STATUS.SUCCESS));
  }
  return action;
};

export const updateProfile = (
  profile: Profile,
  hash?: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  dispatch(updateStatus(hash || '0', STATUS.LOADING));

  const action = await dispatch(
    createAction({
      endpoint: getFullAPIAddress(endpoint),
      method: 'POST',
      body: JSON.stringify(profile),
      headers: withAuth({'Content-Type': 'application/json'}),
      types: ['PROFILE_REQUEST', 'PROFILE_SUCCESS', 'PROFILE_FAILURE'],
    }),
  );

  if (action === undefined || action.error) {
    dispatch(updateStatus(hash || '0', STATUS.FAILURE, action.payload.message));
  } else {
    dispatch(updateStatus(hash || '0', STATUS.SUCCESS));
  }
  return action;
};

export const addContract = (
  id: string,
  hash?: string,
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
) => {
  dispatch(updateStatus(hash || '0', STATUS.LOADING));

  const action = await dispatch(
    createAction({
      endpoint: getFullAPIAddress('/api/profile/new_contact/'),
      method: 'POST',
      body: JSON.stringify({id}),
      headers: withAuth({'Content-Type': 'application/json'}),
      types: ['PROFILE_REQUEST', 'PROFILE_SUCCESS', 'PROFILE_FAILURE'],
    }),
  );

  if (action === undefined || action.error) {
    dispatch(updateStatus(hash || '0', STATUS.FAILURE, action.payload.message));
  } else {
    dispatch(updateStatus(hash || '0', STATUS.SUCCESS));
  }
  return action;
};
