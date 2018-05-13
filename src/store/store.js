import Vue from 'vue'
import Vuex from 'vuex'

import api from './api'
import { TYPES } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    objects: []
  },
  getters: {
    isLoading: state => {
      return state.isLoading
    },
    objects: state => {
      return state.objects
    }
  },
  mutations: {
    [TYPES.SET_IS_LOADING] (state, status) {
      state.isLoading = status
    },
    [TYPES.SET_OBJECTS] (state, data) {
      state.objects = data
    }
  },
  actions: {
    getObjects: function ({ commit, state }) {
      commit(TYPES.SET_IS_LOADING, true)

      api.getAllObjects(state, (res) => {
        commit(TYPES.SET_OBJECTS, res.data)
        commit(TYPES.SET_IS_LOADING, false)
      })
    }
  }
})
