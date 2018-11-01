import Vue from 'vue'
import Vuex from 'vuex'
import vuexPersistentStorage from 'vuex-persistedstate'
import * as mutationTypes from './mutationTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: null,
    user: {}
  },
  getters: {
    authToken (state) {
      return state.authToken
    },
    user (state) {
      return state.user
    }
  },
  mutations: {
    [mutationTypes.SET_AUTH_TOKEN] (state, authToken) {
      state.authToken = authToken
    },
    [mutationTypes.SET_USER] (state, user) {
      state.user = user
    }
  },
  actions: {
    setAuthToken ({ commit }, authToken) {
      commit(mutationTypes.SET_AUTH_TOKEN, authToken)
      this.dispatch('updateHTTPClientAuthToken')
    },
    setUser ({commit}, user) {
      commit(mutationTypes.SET_USER, user)
    },
    updateHTTPClientAuthToken () {
      Vue.prototype.$http.defaults.headers.common.Authorization = this.getters.authToken
    }
  },
  strict: true,
  plugins: [
    vuexPersistentStorage({
      key: 'hsdconnect'
    })
  ]
})
