import axios from 'axios'
import { BASE_URL } from '../constants'

export function getObjectById (id) {
  return axios.get(`${BASE_URL}/objects/${id}`)
    .then(({ data, status }) => {
      if (status >= 200 && status < 300) {
        return mapObjectDto(data)
      }
    })
    .catch((error) => Promise.reject(error))
}

export function getObjectEventsById (id) {
  return axios.get(`${BASE_URL}/objects/${id}/events`)
    .then(({ data, status }) => {
      if (status >= 200 && status < 300) {
        return mapObjectEventsDto(data.data)
      }
    })
    .catch((error) => Promise.reject(error))
}

function mapObjectDto (dto) {
  return {
    coords: { latitude: dto.latitude, longitude: dto.longitude },
    description: dto.description,
    name: dto.name,
    objectId: dto.objectId,
    type: dto.type
  }
}

function mapObjectEventsDto (dto) {
  return dto
}
