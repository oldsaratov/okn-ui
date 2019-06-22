import * as api from '../../api'
import { TYPES } from '../mutation-types'

const state = {
  coords: { latitude: null, longitude: null },
  description: null,
  name: null,
  objectId: null,
  type: null,
  events: []
}

const getters = {}

const mutations = {
  [TYPES.SET_OBJECT] (state, object) {
    state.coords = object.coords
    state.description = object.description
    state.name = object.name
    state.objectId = object.objectId
    state.type = object.type
  },

  [TYPES.SET_OBJECT_EVENTS] (state, events) {
    state.events = events
  },

  [TYPES.CLEAR_OBJECT] (state) {
    state.coords = { latitude: null, longitude: null }
    state.description = null
    state.name = null
    state.objectId = null
    state.type = null
  }
}

const actions = {
  async getObjectById ({ commit, state }, id) {
    commit(TYPES.SET_IS_LOADING, true)
    commit(TYPES.SET_OBJECT, await api.getObjectById(id))
    commit(TYPES.SET_IS_LOADING, false)
  },

  async getObjectEventsById ({ commit, state }, id) {
    commit(TYPES.SET_OBJECT_EVENTS, await api.getObjectEventsById(id))
  },

  clearObject ({ commit }) {
    commit(TYPES.CLEAR_OBJECT)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
