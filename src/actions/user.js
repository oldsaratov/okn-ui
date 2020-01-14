import { getUserProfile } from '../apis/user.api';
import { authService } from '../services/auth.service';
import ACTION_TYPES from './types';
import history from '../history';

export const login = session => {
    authService.saveSession(session);

    return { type: ACTION_TYPES.USER_LOGIN, payload: { session } };
};

export const logout = () => {
    authService.invalidateSession();

    // Refresh current page to trigger redirect to PublicRoute if user logged out on PrivateRoute
    history.go();

    return { type: ACTION_TYPES.USER_LOGOUT };
};

export const fetchUserProfile = () => async dispatch => {
    const profile = await getUserProfile();

    dispatch({ type: ACTION_TYPES.FETCH_USER_PROFILE, payload: { profile } });
};
