import { combineReducers } from 'redux';

import objectsReducer from './objectsReducer';

export default combineReducers({
    objects: objectsReducer
});
