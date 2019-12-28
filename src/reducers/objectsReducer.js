import ACTION_TYPES from  '../actions/types';

const initialState = {
    all: [],
    perPage: [],
    page: 1,
    total: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_OBJECTS_BY_PARAMS:
            return {
                ...state,
                perPage: action.payload.objects,
                page: action.payload.page,
                total: action.payload.total
            };
        case ACTION_TYPES.FETCH_OBJECTS_ALL:
            return {
                ...state,
                all: action.payload
            };
        default:
            return state;
    }
};
