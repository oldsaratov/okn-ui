import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home'
import list from './modules/list'
import object from './modules/object'
import { TYPES } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  getters: {},
  mutations: {
    [TYPES.SET_IS_LOADING] (state, status) {
      state.isLoading = status
    }
  },
  actions: {},
  modules: {
    home, list, object
  }
})
