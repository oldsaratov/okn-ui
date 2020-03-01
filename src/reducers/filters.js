import ACTION_TYPES from '../actions/types';
import { VIEW_TYPES } from '../constants';

const initialState = {
    searchTerm: '',
    objectTypes: [],
    viewType: VIEW_TYPES.MAP
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_SEARCH_TERM_FILTER:
            return { ...state, searchTerm: action.payload };
        case ACTION_TYPES.SET_OBJECT_TYPES_FILTER:
            return { ...state, objectTypes: action.payload };
        case ACTION_TYPES.SET_VIEW_TYPE_FILTER:
            return { ...state, viewType: action.payload };
        default:
            return state;
    }
};
