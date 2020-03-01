import { OBJECT_TYPES } from '../constants';

export const getObjectType = type => {
    return type && OBJECT_TYPES[type];
};
