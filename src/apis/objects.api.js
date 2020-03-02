import { PAGE_SIZE } from '../constants';
import okn from './okn.api';

export function getObjectsGeoJson(params) {
    let queryParams = { perPage: 2000, geoJSON: true };

    if (params && params.term) {
        queryParams = Object.assign(queryParams, { name: params.term });
    }

    if (params && params.types && params.types.length) {
        queryParams = Object.assign(queryParams, { types: params.types.toString() });
    }

    return okn.get('/objects', { params: queryParams })
        .then(({ data, status }) => {
            if (status >= 200 && status < 300) {
                return data;
            }
        })
        .catch((error) => Promise.reject(error));
}

export function getObjectsPerPage(params) {
    let queryParams = { page: params.page, perPage: PAGE_SIZE };

    if (params && params.term) {
        queryParams = Object.assign(queryParams, { name: params.term });
    }

    if (params && params.types && params.types.length) {
        queryParams = Object.assign(queryParams, { types: params.types.toString() });
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

export function requestCreateObject(object) {
    return okn.post(`/objects`, mapObjectToDto(object))
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
    const { coords } = object;

    return {
        name: object.name,
        description: object.description,
        latitude: coords && coords.latitude && coords.latitude.toString(),
        longitude: coords && coords.longitude && coords.longitude.toString(),
        type: object.type,
        mainPhoto: object.mainPhoto,
        photos
    };
}

function mapObjectFromDto(dto) {
    return {
        id: dto.objectId,
        name: dto.name,
        description: dto.description,
        coords: {
            latitude: dto.latitude && parseFloat(dto.latitude),
            longitude: dto.longitude && parseFloat(dto.longitude)
        },
        type: dto.type,
        eventsCount: dto.eventsCount,
        mainPhoto: dto.mainPhoto,
        photos: dto.photos
    };
}
