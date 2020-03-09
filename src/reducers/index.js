import { combineReducers } from 'redux';

import eventsReducer from './events';
import lastEventsReducer from './lastEvents';
import filtersReducer from './filters';
import objectReducer from './object';
import objectsReducer from './objects';
import statusReducer from './status';
import userReducer from './user';

export default combineReducers({
    events: eventsReducer,
    lastEvents: lastEventsReducer,
    filters: filtersReducer,
    object: objectReducer,
    objects: objectsReducer,
    status: statusReducer,
    user: userReducer
});
