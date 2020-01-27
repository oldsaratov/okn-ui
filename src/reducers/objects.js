import ACTION_TYPES from  '../actions/types';

const initialState = {
    all: [],
    perPage: [],
    page: 1,
    total: null,
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_OBJECTS:
            return { ...state, loading: true };
        case ACTION_TYPES.FETCH_OBJECTS_PER_PAGE:
            return {
                ...state,
                perPage: action.payload.objects,
                page: action.payload.page,
                total: action.payload.total,
                loading: false
            };
        case ACTION_TYPES.FETCH_OBJECTS_ALL:
            return {
                ...state,
                all: action.payload,
                loading: false
            };
        default:
            return state;
    }
};
