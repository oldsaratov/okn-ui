import {
    getObjectEvents,
    requestDeleteObjectEvent,
    requestPostObjectEvent,
    requestUpdateObjectEvent
} from '../apis/events.api';
import { requestStatus, requestStatusFailure, requestStatusSuccess } from './status';
import ACTION_TYPES from './types';

export const resetObjectEvents = () => ({ type: ACTION_TYPES.RESET_OBJECT_EVENTS });

export const fetchObjectEvents = id => async dispatch => {
    dispatch({ type: ACTION_TYPES.FETCH_OBJECT_EVENTS });

    try {
        const response = await getObjectEvents(id);

        dispatch({ type: ACTION_TYPES.FETCH_OBJECT_EVENTS_SUCCESS, payload: response });
    } catch (error) {
        dispatch({ type: ACTION_TYPES.FETCH_OBJECT_EVENTS_FAILURE, payload: error });
    }
};

export const createObjectEvent = (objectId, event) => async dispatch => {
    const status = { type: 'create', id: 'event' };

    dispatch(requestStatus(status));

    try {
        const response = await requestPostObjectEvent(objectId, event);

        dispatch(requestStatusSuccess({ response, ...status }));
        dispatch(fetchObjectEvents(objectId));
    } catch (error) {
        dispatch(requestStatusFailure({ error, ...status }));
    }
};

export const updateObjectEvent = (objectId, event) => async dispatch => {
    const status = { type: 'update', id: event.id };

    dispatch(requestStatus(status));

    try {
        const response = await requestUpdateObjectEvent(objectId, event);

        dispatch(requestStatusSuccess({ response, ...status }));
        dispatch(fetchObjectEvents(objectId));
    } catch (error) {
        dispatch(requestStatusFailure({ error, ...status }));
    }
};

export const deleteObjectEvent = (objectId, eventId) => async dispatch => {
    const status = { type: 'delete', id: eventId };

    dispatch(requestStatus(status));

    try {
        const response = await requestDeleteObjectEvent(objectId, eventId);

        dispatch(requestStatusSuccess({ response, ...status }));
        dispatch(fetchObjectEvents(objectId));
    } catch (error) {
        dispatch(requestStatusFailure({ error, ...status }));
    }
};
