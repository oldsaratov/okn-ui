const ACTION_TYPES = {
    // Objects
    FETCH_OBJECTS: 'FETCH_OBJECTS',
    FETCH_OBJECTS_PER_PAGE: 'FETCH_OBJECTS_BY_PARAMS',
    FETCH_OBJECTS_ALL: 'FETCH_OBJECTS_ALL',

    // Object
    FETCH_OBJECT: 'FETCH_OBJECT',
    FETCH_OBJECT_SUCCESS: 'FETCH_OBJECT_SUCCESS',
    FETCH_OBJECT_FAILURE: 'FETCH_OBJECT_FAILURE',
    RESET_OBJECT: 'RESET_OBJECT',

    // Events
    FETCH_OBJECT_EVENTS: 'FETCH_OBJECT_EVENTS',
    FETCH_OBJECT_EVENTS_SUCCESS: 'FETCH_OBJECT_EVENTS_SUCCESS',
    FETCH_OBJECT_EVENTS_FAILURE: 'FETCH_OBJECT_EVENTS_FAILURE',
    RESET_OBJECT_EVENTS: 'RESET_OBJECT_EVENTS',

    // Status
    REQUEST_STATUS: 'REQUEST_STATUS',
    REQUEST_STATUS_SUCCESS: 'REQUEST_STATUS_SUCCESS',
    REQUEST_STATUS_FAILURE: 'REQUEST_STATUS_FAILURE',

    // User
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGOUT: 'USER_LOGOUT',
    FETCH_USER_PROFILE: 'FETCH_USER_PROFILE'
};

export default ACTION_TYPES;