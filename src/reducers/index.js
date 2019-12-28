import { combineReducers } from 'redux';

import objectsReducer from './objectsReducer';
import userReducer from './userReducer';

export default combineReducers({
    objects: objectsReducer,
    user: userReducer
});
