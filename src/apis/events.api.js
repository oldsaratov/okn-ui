import moment from 'moment';

import okn from './okn.api';
import { mapObjectFromDto } from './objects.api';

export function requestPostObjectEvent(objectId, event) {
    return okn.post(`/objects/${objectId}/events`, mapObjectEventToDto(event))
        .catch((error) => Promise.reject(error));
}

export function requestUpdateObjectEvent(objectId, event) {
    return okn.post(`/objects/${objectId}/events/${event.id}`, mapObjectEventToDto(event))
        .catch((error) => Promise.reject(error));
}

export function requestDeleteObjectEvent(objectId, eventId) {
    return okn.delete(`/objects/${objectId}/events/${eventId}`)
        .catch((error) => Promise.reject(error));
}

export function getObjectEvents(id) {
    return okn.get(`/objects/${id}/events`)
        .then(({ data, status }) => {
            if (status >= 200 && status < 300) {
                return mapObjectEventsFromDto(data.data);
            }
        })
        .catch((error) => Promise.reject(error));
}

export function getLastEvents() {
    return okn.get(`/objects/events/last`, { params: { perPage: 12 } })
        .then(({ data, status }) => {
            if (status >= 200 && status < 300) {
                return data.data.map(object => Object.assign(
                    mapObjectFromDto(object),
                    { lastEvent: mapObjectEventsFromDto([object.lastEvent])[0] }
                ));
            }
        })
        .catch((error) => Promise.reject(error));
}

function mapObjectEventToDto(event) {
    const files = (event.files || []).map(event => ({
        fileId: event.fileId,
        url: event.url,
        description: event.description
    }));
    const photos = (event.photos || []).map(event => ({
        fileId: event.fileId,
        url: event.url,
        description: event.description
    }));

    return {
        name: event.name,
        description: event.description,
        occuredAt: event.occuredAt.toISOString(),
        files,
        photos
    };
}

function mapObjectEventsFromDto(dto) {
    return (dto || []).map(obj => ({
        id: obj.eventId,
        name: obj.name || '',
        description: obj.description || '',
        occuredAt: moment(obj.occuredAt),
        files: obj.files || [],
        photos: obj.photos || []
    }));
}
