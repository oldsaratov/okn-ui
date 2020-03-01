import ACTION_TYPES from './types';

export const setSearchTermFilter = payload => ({ type: ACTION_TYPES.SET_SEARCH_TERM_FILTER, payload });

export const setObjectTypesFilter = payload => ({ type: ACTION_TYPES.SET_OBJECT_TYPES_FILTER, payload });

export const setViewTypeFilter = payload => ({ type: ACTION_TYPES.SET_VIEW_TYPE_FILTER, payload });
