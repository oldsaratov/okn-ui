import { combineReducers } from 'redux';

import objectReducer from './objectReducer';
import objectsReducer from './objectsReducer';
import userReducer from './userReducer';

export default combineReducers({
    object: objectReducer,
    objects: objectsReducer,
    user: userReducer
});
