import { PAGE_SIZE } from '../constants';
import okn from './okn.api';

export function getAllObjects() {
    return okn.get('/objects', { params: { perPage: 2000 } })
        .then(({ data, status }) => {
            if (status >= 200 && status < 300) {
                return data.data.map(object => mapObjectFromDto(object));
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
                    objects: data.data.map(object => mapObjectFromDto(object)),
                    page: data.page,
                    total: data.total
                };
            }
        })
        .catch((error) => Promise.reject(error));
}

export function getObjectById(id) {
    return okn.get(`/objects/${id}`)
        .then(({ data, status }) => {
            if (status >= 200 && status < 300) {
                return mapObjectFromDto(data);
            }
        })
        .catch((error) => Promise.reject(error));
}

export function requestUpdateObject(object) {
    return okn.post(`/objects/${object.id}`, mapObjectToDto(object))
        .catch((error) => Promise.reject(error));
}

function mapObjectToDto(object) {
    const photos = (object.photos || []).map(event => ({
        fileId: event.fileId,
        url: event.url,
        description: event.description
    }));

    return {
        name: object.name,
        description: object.description,
        latitude: object.coords.latitude,
        longitude: object.coords.longitude,
        type: object.type,
        photos
    };
}

function mapObjectFromDto(dto) {
    return {
        id: dto.objectId,
        name: dto.name,
        description: dto.description,
        coords: { latitude: dto.latitude, longitude: dto.longitude },
        type: dto.type,
        eventsCount: dto.eventsCount,
        mainPhoto: dto.mainPhoto,
        photos: dto.photos
    };
}
