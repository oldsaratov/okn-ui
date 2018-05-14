import axios from 'axios'

const BASE_URL = 'https://okn.azurewebsites.net/api/'

export function getObjectsPerPage (page = 1) {
  return axios.get(BASE_URL + 'objects', { params: { page, perPage: 20 } })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res.data
      }
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
