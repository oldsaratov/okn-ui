import ACTION_TYPES from  '../actions/types';

const initialState = {
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_OBJECT:
            return { ...state, loading: true };
        case ACTION_TYPES.FETCH_OBJECT_SUCCESS:
            return { ...state, loading: false, error: null, ...action.payload };
        case ACTION_TYPES.FETCH_OBJECT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ACTION_TYPES.RESET_OBJECT:
            return { ...initialState };
        default:
            return state;
    }
};
