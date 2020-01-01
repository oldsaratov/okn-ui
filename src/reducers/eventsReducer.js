import ACTION_TYPES from  '../actions/types';

const initialState = {
    // Events
    loading: false,
    error: null,
    events: [],

    // Event
    confirmLoading: false,
    confirmError: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        // Events
        case ACTION_TYPES.FETCH_OBJECT_EVENTS:
            return { ...state, loading: true };
        case ACTION_TYPES.FETCH_OBJECT_EVENTS_SUCCESS:
            return { ...state, loading: false, error: null, events: action.payload };
        case ACTION_TYPES.FETCH_OBJECT_EVENTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ACTION_TYPES.RESET_OBJECT_EVENTS:
            return { ...initialState };

        // Event
        case ACTION_TYPES.REQUEST_OBJECT_EVENT:
            return { ...state, confirmLoading: true };
        case ACTION_TYPES.REQUEST_OBJECT_EVENT_SUCCESS:
            return { ...state, confirmLoading: false, confirmError: null };
        case ACTION_TYPES.REQUEST_OBJECT_EVENT_FAILURE:
            return { ...state, confirmLoading: false, confirmError: action.payload };
        default:
            return state;
    }
};
