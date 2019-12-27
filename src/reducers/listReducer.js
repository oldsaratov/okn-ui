import ACTION_TYPES from  '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_OBJECTS_BY_PARAMS:
            return action.payload;
        default:
            return state;
    }
};
