import Vue from 'vue';
import Vuex from 'vuex';
import vuexPersistentStorage from 'vuex-persistedstate';
import * as mutationTypes from './mutationTypes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: false
  },
  getters: {
    authToken(state) {
      return state.authToken;
    }
  },
  mutations: {
    [mutationTypes.SET_AUTH_TOKEN](state, authToken) {
      state.authToken = authToken;
    }
  },
  actions: {
    setAuthToken({ commit }, authToken) {
      commit(mutationTypes.SET_AUTH_TOKEN, authToken);
      this.dispatch('setAuthTokenInHTTPClient');
    },
    setAuthTokenInHTTPClient({ commit }) {
      Vue.prototype.$http.defaults.headers.common.Authorization = this.getters.authToken;
    }
  },
  strict: true, 
  plugins: [
    vuexPersistentStorage({
      key: 'hsdconnect'
    })
  ]
});
