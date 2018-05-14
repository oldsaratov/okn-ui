import * as api from '../../api'
import { TYPES } from '../mutation-types'

const state = {
  isLoading: false,
  objects: [],
  page: null,
  total: null
}

const getters = {
  isLoading: state => state.isLoading,
  objects: state => state.objects,
  page: state => state.page,
  total: state => state.total
}

const mutations = {
  [TYPES.SET_IS_LOADING] (state, status) {
    state.isLoading = status
  },
  [TYPES.SET_OBJECTS] (state, { data, page, total }) {
    state.objects = data
    state.page = page
    state.total = total
  }
}

const actions = {
  async getObjectsPerPage ({ commit, state }, page) {
    commit(TYPES.SET_IS_LOADING, true)
    commit(TYPES.SET_OBJECTS, await api.getObjectsPerPage(page))
    commit(TYPES.SET_IS_LOADING, false)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
