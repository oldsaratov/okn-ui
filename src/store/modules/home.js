import * as api from '../../api/objects.api'
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
  getAllObjects ({ state, commit }) {
    // let objects = state.objects.length > 0 ? state.objects : api.getAllObjects()

    if (state.objects.length === 0) {
      commit(TYPES.SET_IS_LOADING, true)

      api.getAllObjects()
        .then(objects => {
          commit(TYPES.SET_OBJECTS, objects)
          commit(TYPES.SET_IS_LOADING, false)
        })
    } else {
      commit(TYPES.SET_OBJECTS, state.objects)
    }

    // commit(TYPES.SET_OBJECTS, objects)
    // commit(TYPES.SET_IS_LOADING, false)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
