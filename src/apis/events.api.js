import moment from 'moment';

import okn from './okn.api';

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

function mapObjectEventToDto(event) {
    return {
        ...event,
        occuredAt: event.occuredAt.toISOString()
    };
}

function mapObjectEventsFromDto (dto) {
    return (dto|| []).map(obj => ({
        id: obj.eventId,
        name: obj.name || '',
        description: obj.description || '',
        occuredAt: moment(obj.occuredAt),
        links: obj.links || [],
        images: obj.images || []
    }));
}
