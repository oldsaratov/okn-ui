import axios from 'axios'
import { PAGE_SIZE } from '../constants'

const BASE_URL = 'https://okn.azurewebsites.net/api/'

export function getObjectsByParams (params) {
  let page = params && params.page ? params.page : 1
  let types = params && params.types && params.types.length ? params.types.toString() : null
  let queryParams = { page, perPage: PAGE_SIZE }

  if (types) {
    queryParams = Object.assign(queryParams, { types })
  }

  return axios.get(BASE_URL + 'objects', { params: queryParams })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

export function getObjectById (id) {
  return axios.get(BASE_URL + 'objects/' + id)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
