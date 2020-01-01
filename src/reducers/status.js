import ACTION_TYPES from '../actions/types';

const initialState = {
    create: {},
    update: {},
    delete: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.REQUEST_STATUS:
            return {
                ...state,
                [action.payload.type]: { [action.payload.id]: { loading: true, error: null } }
            };
        case ACTION_TYPES.REQUEST_STATUS_SUCCESS:
            return {
                ...state,
                [action.payload.type]: { [action.payload.id]: { loading: false, error: null } }
            };
        case ACTION_TYPES.REQUEST_STATUS_FAILURE:
            return {
                ...state,
                [action.payload.type]: { [action.payload.id]: { loading: false, error: action.payload.error } }
            };
        default:
            return state;
    }
};
