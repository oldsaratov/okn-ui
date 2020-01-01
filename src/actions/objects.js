import { getAllObjects, getObjectById, getObjectsByParams } from '../apis/objects.api';
import { resetObjectEvents } from './events';
import ACTION_TYPES from './types';

export const fetchAllObjects = params => async dispatch => {
    dispatch({ type: ACTION_TYPES.FETCH_OBJECTS });

    try {
        const response = await getAllObjects(params);

        dispatch({ type: ACTION_TYPES.FETCH_OBJECTS_ALL, payload: response });
    } catch (error) {
        console.log('TODO: Show message: ', error);
    }
};

export const fetchObjectsByParams = params => async dispatch => {
    dispatch({ type: ACTION_TYPES.FETCH_OBJECTS });

    try {
        const response = await getObjectsByParams(params);

        dispatch({ type: ACTION_TYPES.FETCH_OBJECTS_BY_PARAMS, payload: response });
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

export const resetObject = () => ({ type: ACTION_TYPES.RESET_OBJECT });
