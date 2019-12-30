import { getObjectEventsById } from  '../apis/events.api';
import ACTION_TYPES from  './types';

export const fetchObjectEvents = id => async dispatch => {
    dispatch({ type: ACTION_TYPES.FETCH_OBJECT_EVENTS });

    try {
        const response = await getObjectEventsById(id);

        dispatch({ type: ACTION_TYPES.FETCH_OBJECT_EVENTS_SUCCESS, payload: response });
    } catch (error) {
        dispatch({ type: ACTION_TYPES.FETCH_OBJECT_EVENTS_FAILURE, payload: error });
    }
};

export const resetObjectEvents = () => {
    return { type: ACTION_TYPES.RESET_OBJECT_EVENTS }
};
