import * as api from '../../api'
import { TYPES } from '../mutation-types'

const state = {
  objects: [],
  page: null,
  total: null
}

const getters = {
  objects: state => state.objects
}

const mutations = {
  [TYPES.SET_OBJECTS] (state, { data, page, total }) {
    state.objects = data
    state.page = page
    state.total = total
  }
}

const actions = {
  async getObjectsByParams ({ commit, state }, options) {
    commit(TYPES.SET_IS_LOADING, true)
    commit(TYPES.SET_OBJECTS, await api.getObjectsByParams(options))
    commit(TYPES.SET_IS_LOADING, false)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
