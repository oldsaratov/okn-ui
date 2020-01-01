import ACTION_TYPES from '../actions/types';

const unauthenticatedState = {
    session: null,
    profile: null
};
const initialState = { ...unauthenticatedState };

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.USER_LOGIN:
            return { ...state, session: action.payload.session };
        case ACTION_TYPES.USER_LOGOUT:
            return { ...unauthenticatedState };
        case ACTION_TYPES.FETCH_USER_PROFILE:
            return { ...state, profile: action.payload.profile };
        default:
            return state;
    }
};
