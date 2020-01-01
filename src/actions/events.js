import {
    getObjectEvents,
    requestDeleteObjectEvent,
    requestPostObjectEvent,
    requestUpdateObjectEvent
} from '../apis/events.api';
import ACTION_TYPES from './types';

const requestObjectEvent = () => ({ type: ACTION_TYPES.REQUEST_OBJECT_EVENT });
const requestObjectEventSuccess = response => ({ type: ACTION_TYPES.REQUEST_OBJECT_EVENT_SUCCESS, payload: response });
const requestObjectEventFailure = error => ({ type: ACTION_TYPES.REQUEST_OBJECT_EVENT_SUCCESS, payload: error });

export const createObjectEvent = (objectId, event) => async dispatch => {
    dispatch(requestObjectEvent());

    try {
        const response = await requestPostObjectEvent(objectId, event);

        dispatch(requestObjectEventSuccess(response));
        dispatch(fetchObjectEvents(objectId));
    } catch (error) {
        dispatch(requestObjectEventFailure());
    }
};

export const updateObjectEvent = (objectId, event) => async dispatch => {
    dispatch(requestObjectEvent());

    try {
        const response = await requestUpdateObjectEvent(objectId, event);

        dispatch(requestObjectEventSuccess(response));
        dispatch(fetchObjectEvents(objectId));
    } catch (error) {
        dispatch(requestObjectEventFailure());
    }
};

export const deleteObjectEvent = (objectId, eventId) => async dispatch => {
    dispatch(requestObjectEvent());

    try {
        const response = await requestDeleteObjectEvent(objectId, eventId);

        dispatch(requestObjectEventSuccess(response));
        dispatch(fetchObjectEvents(objectId));
    } catch (error) {
        dispatch(requestObjectEventFailure());
    }
};

export const fetchObjectEvents = id => async dispatch => {
    dispatch({ type: ACTION_TYPES.FETCH_OBJECT_EVENTS });

    try {
        const response = await getObjectEvents(id);

        dispatch({ type: ACTION_TYPES.FETCH_OBJECT_EVENTS_SUCCESS, payload: response });
    } catch (error) {
        dispatch({ type: ACTION_TYPES.FETCH_OBJECT_EVENTS_FAILURE, payload: error });
    }
};

export const resetObjectEvents = () => ({ type: ACTION_TYPES.RESET_OBJECT_EVENTS });
