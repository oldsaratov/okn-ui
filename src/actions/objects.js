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
