import ACTION_TYPES from  '../actions/types';

const initialState = {
    loading: false,
    error: null,
    objects: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_LAST_OBJECT_EVENTS:
            return { ...state, loading: true };
        case ACTION_TYPES.FETCH_LAST_OBJECT_EVENTS_SUCCESS:
            return { ...state, loading: false, error: null, objects: action.payload };
        case ACTION_TYPES.FETCH_LAST_OBJECT_EVENTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ACTION_TYPES.RESET_LAST_OBJECT_EVENTS:
            return { ...initialState };
        default:
            return state;
    }
};
