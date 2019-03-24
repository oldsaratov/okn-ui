import axios from 'axios'
import { PAGE_SIZE } from '../constants'

const BASE_URL = 'https://dev.okn.oldsaratov.ru/api/'

export function getAllObjects () {
  return axios.get(BASE_URL + 'objects', { params: { perPage: 2000 } })
    .then(({ data, status }) => {
      if (status >= 200 && status < 300) {
        return data.data.map(object => mapObjectDto(object))
      }
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export function getObjectsByParams (params) {
  let page = params && params.page ? params.page : 1
  let types = params && params.types && params.types.length ? params.types.toString() : null
  let queryParams = { page, perPage: PAGE_SIZE }

  if (types) {
    queryParams = Object.assign(queryParams, { types })
  }

  return axios.get(BASE_URL + 'objects', { params: queryParams })
    .then(({ data, status }) => {
      if (status >= 200 && status < 300) {
        return {
          data: data.data.map(object => mapObjectDto(object)),
          page: data.page,
          total: data.total
        }
      }
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export function getObjectById (id) {
  return axios.get(BASE_URL + 'objects/' + id)
    .then(({ data, status }) => {
      if (status >= 200 && status < 300) {
        return mapObjectDto(data)
      }
    })
    .catch((error) => {
      return Promise.reject(error)
    })
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
