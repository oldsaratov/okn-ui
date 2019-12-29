import okn from './okn.api';

export function getObjectById(id) {
    return okn.get(`/objects/${id}`)
        .then(({ data, status }) => {
            if (status >= 200 && status < 300) {
                return mapObjectDto(data);
            }
        })
        .catch((error) => Promise.reject(error));
}

function mapObjectDto(dto) {
    return {
        coords: { latitude: dto.latitude, longitude: dto.longitude },
        description: dto.description,
        name: dto.name,
        objectId: dto.objectId,
        type: dto.type
    };
}
