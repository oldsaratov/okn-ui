import * as api from '../../api'
import { TYPES } from '../mutation-types'

const state = {
  coords: { latitude: null, longitude: null },
  description: null,
  name: null,
  objectId: null,
  type: null
}

const getters = {
  object: state => state.object
}

const mutations = {
  [TYPES.SET_OBJECT] (state, object) {
    state.coords = { latitude: object.latitude, longitude: object.longitude }
    state.description = object.description
    state.name = object.name
    state.objectId = object.objectId
    state.type = object.type
  }
}

const actions = {
  async getObjectById ({ commit, state }, id) {
    commit(TYPES.SET_IS_LOADING, true)
    commit(TYPES.SET_OBJECT, await api.getObjectById(id))
    commit(TYPES.SET_IS_LOADING, false)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
