import { combineReducers } from 'redux';

import eventsReducer from './eventsReducer';
import objectReducer from './objectReducer';
import objectsReducer from './objectsReducer';
import userReducer from './userReducer';

export default combineReducers({
    events: eventsReducer,
    object: objectReducer,
    objects: objectsReducer,
    user: userReducer
});
