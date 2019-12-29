import { getUserProfile } from '../apis/user.api';
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

export const fetchUserProfile = () => async dispatch => {
    const profile = await getUserProfile();

    dispatch({ type: ACTION_TYPES.FETCH_USER_PROFILE, payload: { profile } });
};
