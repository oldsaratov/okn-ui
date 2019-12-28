import { PAGE_SIZE } from '../constants';
import okn from './okn.api';

export function getAllObjects() {
    return okn.get('/objects', { params: { perPage: 2000 } })
        .then(({ data, status }) => {
            if (status >= 200 && status < 300) {
                return data.data.map(object => mapObjectDto(object));
            }
        })
        .catch((error) => Promise.reject(error));
}

export function getObjectsByParams(params) {
    const page = params && params.page ? params.page : 1;
    const types = params && params.types && params.types.length ? params.types.toString() : null;
    const term = params && params.term ? params.term : null;
    let queryParams = { page, perPage: PAGE_SIZE, name: term };

    if (types) {
        queryParams = Object.assign(queryParams, { types });
    }

    return okn.get('/objects', { params: queryParams })
        .then(({ data, status }) => {
            if (status >= 200 && status < 300) {
                return {
                    objects: data.data.map(object => mapObjectDto(object)),
                    page: data.page,
                    total: data.total
                };
            }
        })
        .catch((error) => Promise.reject(error));
}

function mapObjectDto(dto) {
    return {
        coords: { latitude: dto.latitude, longitude: dto.longitude },
        description: dto.description,
        name: dto.name,
        id: dto.objectId,
        type: dto.type
    };
}
