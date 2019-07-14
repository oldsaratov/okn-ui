import axios from 'axios'
import { BASE_URL } from '../constants'

export function getObjectEventsById (id) {
  return axios.get(`${BASE_URL}/objects/${id}/events`)
    .then(({ data, status }) => {
      if (status >= 200 && status < 300) {
        return mapObjectEventsDto(data.data)
      }
    })
    .catch((error) => Promise.reject(error))
}

function mapObjectEventsDto (dto) {
  return dto.map(obj => ({
    name: obj.name || '',
    description: obj.description || '',
    occuredAt: new Date(obj.occuredAt),
    links: obj.links || [],
    images: obj.images || []
  }))
}
