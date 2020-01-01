import { combineReducers } from 'redux';

import eventsReducer from './events';
import objectReducer from './object';
import objectsReducer from './objects';
import statusReducer from './status';
import userReducer from './user';

export default combineReducers({
    events: eventsReducer,
    object: objectReducer,
    objects: objectsReducer,
    status: statusReducer,
    user: userReducer
});
