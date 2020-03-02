import {
    getObjectById,
    getObjectsGeoJson,
    getObjectsPerPage,
    requestCreateObject,
    requestUpdateObject
} from '../apis/objects.api';
import { resetObjectEvents } from './events';
import ACTION_TYPES from './types';
import { requestStatus, requestStatusFailure, requestStatusSuccess } from './status';

export const fetchAllObjects = params => async dispatch => {
    dispatch({ type: ACTION_TYPES.FETCH_OBJECTS });

    try {
        const response = await getObjectsGeoJson(params);

        dispatch({ type: ACTION_TYPES.FETCH_OBJECTS_ALL, payload: response });
    } catch (error) {
        console.log('TODO: Show message: ', error);
    }
};

export const fetchObjectsPerPage = params => async dispatch => {
    dispatch({ type: ACTION_TYPES.FETCH_OBJECTS });

    try {
        const response = await getObjectsPerPage(params);

        dispatch({ type: ACTION_TYPES.FETCH_OBJECTS_PER_PAGE, payload: response });
    } catch (error) {
        console.log('TODO: Show message: ', error);
    }
};

export const fetchObject = id => async dispatch => {
    dispatch({ type: ACTION_TYPES.FETCH_OBJECT });
    dispatch(resetObjectEvents());

    try {
        const response = await getObjectById(id);

        dispatch({ type: ACTION_TYPES.FETCH_OBJECT_SUCCESS, payload: response });
    } catch (error) {
        dispatch({ type: ACTION_TYPES.FETCH_OBJECT_FAILURE, payload: error });
    }
};

export const createObject = object => async dispatch => {
    const status = { type: 'create', id: 'newObject' };

    dispatch(requestStatus(status));

    try {
        const response = await requestCreateObject(object);

        dispatch({ type: ACTION_TYPES.FETCH_OBJECT_SUCCESS, payload: response });
        dispatch(requestStatusSuccess({ response, ...status }));
    } catch (error) {
        dispatch({ type: ACTION_TYPES.FETCH_OBJECT_FAILURE, payload: error });
        dispatch(requestStatusFailure({ error, ...status }));
    }
};

export const updateObject = object => async dispatch => {
    const status = { type: 'update', id: object.id };

    dispatch(requestStatus(status));

    try {
        const response = await requestUpdateObject(object);

        dispatch(requestStatusSuccess({ response, ...status }));
    } catch (error) {
        dispatch(requestStatusFailure({ error, ...status }));
    }
};

export const resetObject = () => ({ type: ACTION_TYPES.RESET_OBJECT });
