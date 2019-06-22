import * as api from '../../api/events.api'
import { TYPES } from '../mutation-types'

const state = {
  events: []
}

const getters = {
  events: state => state.events
}

const mutations = {
  [TYPES.SET_OBJECT_EVENTS] (state, events) {
    state.events = events
  },

  [TYPES.CLEAR_OBJECT_EVENTS] (state) {
    state.events = []
  }
}

const actions = {
  async getObjectEventsById ({ commit, state }, id) {
    commit(TYPES.SET_OBJECT_EVENTS, await api.getObjectEventsById(id))
  },

  clearObjectEvents ({ commit }) {
    commit(TYPES.CLEAR_OBJECT_EVENTS)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
