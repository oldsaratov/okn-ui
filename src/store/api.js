import axios from 'axios'

const BASE_URL = 'https://okn.azurewebsites.net/api/'

export default {
  getAllObjects: function (state, cb) {
    axios.get(BASE_URL + 'objects', { params: { page: 1, perPage: 2000 } })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          cb(res.data)
        }
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
}
