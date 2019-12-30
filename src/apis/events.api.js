import okn from './okn.api';

export function getObjectEventsById (id) {
    return okn.get(`/objects/${id}/events`)
        .then(({ data, status }) => {
            if (status >= 200 && status < 300) {
                return mapObjectEventsDto(data.data);
            }
        })
        .catch((error) => Promise.reject(error));
}

function mapObjectEventsDto (dto) {
    return (dto|| []).map(obj => ({
        id: obj.eventId,
        name: obj.name || '',
        description: obj.description || '',
        occuredAt: new Date(obj.occuredAt),
        links: obj.links || [],
        images: obj.images || []
    }));
}