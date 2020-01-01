import ACTION_TYPES from './types';

export const requestStatus = payload => ({ type: ACTION_TYPES.REQUEST_STATUS, payload });

export const requestStatusSuccess = payload => ({ type: ACTION_TYPES.REQUEST_STATUS_SUCCESS, payload });

export const requestStatusFailure = payload => ({ type: ACTION_TYPES.REQUEST_STATUS_FAILURE, payload });
