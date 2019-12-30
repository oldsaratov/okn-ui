import { getObjectById } from  '../apis/object.api';
import { getAllObjects, getObjectsByParams } from  '../apis/objects.api';
import ACTION_TYPES from  './types';

export const fetchAllObjects = params => async dispatch => {
    const response = await getAllObjects(params);

    dispatch({ type: ACTION_TYPES.FETCH_OBJECTS_ALL, payload: response });
};

export const fetchObjectsByParams = params => async dispatch => {
    const response = await getObjectsByParams(params);

    dispatch({ type: ACTION_TYPES.FETCH_OBJECTS_BY_PARAMS, payload: response });
};

export const fetchObject = id => async dispatch => {
    dispatch({ type: ACTION_TYPES.FETCH_OBJECT });

    try {
        const response = await getObjectById(id);

        dispatch({ type: ACTION_TYPES.FETCH_OBJECT_SUCCESS, payload: response });
    } catch (error) {
        dispatch({ type: ACTION_TYPES.FETCH_OBJECT_FAILURE, payload: error });
    }
};

export const resetObject = () => {
    return { type: ACTION_TYPES.RESET_OBJECT }
};