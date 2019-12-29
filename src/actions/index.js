import { getAllObjects, getObjectsByParams } from  '../apis/objects.api';
import { authService } from  '../services/auth.service';
import ACTION_TYPES from  './types';

export const login = session => {
    authService.saveSession(session);

    return { type: ACTION_TYPES.USER_LOGIN, payload: { session } };
};

export const logout = () => {
    authService.invalidateSession();

    return { type: ACTION_TYPES.USER_LOGOUT };
};

export const fetchAllObjects = params => async dispatch => {
    const response = await getAllObjects(params);

    dispatch({ type: ACTION_TYPES.FETCH_OBJECTS_ALL, payload: response });
};

export const fetchObjectsByParams = params => async dispatch => {
    const response = await getObjectsByParams(params);

    dispatch({ type: ACTION_TYPES.FETCH_OBJECTS_BY_PARAMS, payload: response });
};
