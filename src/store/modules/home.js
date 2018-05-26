import * as api from '../../api'
import { TYPES } from '../mutation-types'

const state = {
  objects: []
}

const getters = {
  mapObjects: state => state.objects
}

const mutations = {
  [TYPES.SET_OBJECTS] (state, objects) {
    state.objects = objects
  }
}

const actions = {
  async getAllObjects ({ commit }) {
    commit(TYPES.SET_IS_LOADING, true)
    commit(TYPES.SET_OBJECTS, await api.getAllObjects())
    commit(TYPES.SET_IS_LOADING, false)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
