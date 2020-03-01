import { combineReducers } from 'redux';

import eventsReducer from './events';
import filtersReducer from './filters';
import objectReducer from './object';
import objectsReducer from './objects';
import statusReducer from './status';
import userReducer from './user';

export default combineReducers({
    events: eventsReducer,
    filters: filtersReducer,
    object: objectReducer,
    objects: objectsReducer,
    status: statusReducer,
    user: userReducer
});
