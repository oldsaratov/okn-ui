import { getObjectsByParams } from  '../apis/objects.api';
import ACTION_TYPES from  './types';

export const fetchObjectsByParams = params => async dispatch => {
    const response = await getObjectsByParams(params);

    dispatch({ type: ACTION_TYPES.FETCH_OBJECTS_BY_PARAMS, payload: response });
};
