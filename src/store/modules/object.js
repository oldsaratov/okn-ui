import * as api from '../../api'
import { TYPES } from '../mutation-types'

const state = {
  objectId: null,
  name: null,
  description: null,
  type: null
}

const getters = {
  object: state => state.object
}

const mutations = {
  [TYPES.SET_OBJECT] (state, object) {
    state.objectId = object.objectId
    state.name = object.name
    state.description = object.description
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
