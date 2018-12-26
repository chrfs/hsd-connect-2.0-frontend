import Vue from 'vue'
import * as mutationTypes from './mutationTypes'

const userModule = {
  state: {
    authToken: null,
    user: {}
  },
  getters: {
    getAuthToken (state) {
      return state.authToken
    },
    getUser (state) {
      return state.user
    }
  },
  mutations: {
    [mutationTypes.SET_AUTH_TOKEN] (state, authToken) {
      state.authToken = authToken
    },
    [mutationTypes.SET_USER] (state, user) {
      state.user = user
    },
    [mutationTypes.ADD_BOOKMARKED_PROJECT] (state, bookmarkProjects) {
      state.user.bookmarkedProjects = bookmarkProjects
    }
  },
  actions: {
    setAuthToken ({ commit }, authToken) {
      commit(mutationTypes.SET_AUTH_TOKEN, authToken)
      this.dispatch('user/updateHTTPClientAuthToken')
    },
    setUser ({ commit }, user) {
      commit(mutationTypes.SET_USER, user)
    },
    bookmarkProject ({commit, getters}, projectId) {
      this._vm.$http.put('/users/' + getters.getUser._id + '/bookmark/' + projectId).then(({ data: { data } }) => {
        commit(mutationTypes.ADD_BOOKMARKED_PROJECT, data.bookmarkedProjects || [])
      })
    },
    updateHTTPClientAuthToken () {
      Vue.prototype.$http.defaults.headers.common.Authorization = this.getters.getAuthToken
    }
  },
  namespaced: true
}

export default userModule
