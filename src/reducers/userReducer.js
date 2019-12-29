import ACTION_TYPES from '../actions/types';

const unauthenticatedState = {
    isLoggedIn: false,
    session: null,
    profile: null
};
const initialState = { ...unauthenticatedState };

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.USER_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                session: action.payload.session
            };
        case ACTION_TYPES.USER_LOGOUT:
            return { ...unauthenticatedState };
        default:
            return state;
    }
};
