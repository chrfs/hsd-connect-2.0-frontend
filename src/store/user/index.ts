import Vue from 'vue';
import { UserInterface } from '../models/User';
import * as mutationTypes from './mutationTypes';

const userModule = {
  state: {
    authToken: null,
    user: {} as UserInterface,
  },
  getters: {
    getAuthToken(state: any): string {
      return state.authToken;
    },
    getUser(state: any): any {
      return state.user;
    },
  },
  mutations: {
    [mutationTypes.SET_AUTH_TOKEN](state: any, authToken: string) {
      state.authToken = authToken;
    },
    [mutationTypes.SET_USER](state: any, user: any) {
      state.user = user;
    },
    [mutationTypes.ADD_BOOKMARKED_PROJECT](state: any, bookmarkProjects: any) {
      state.user.bookmarkedProjects = bookmarkProjects;
    },
    [mutationTypes.SET_HTTP_CLIENT_AUTH_TOKEN](state: any) {
      Vue.prototype.$http.defaults.headers.common.Authorization = state.authToken;
    },
  },
  actions: {
    setAuthToken({ commit, dispatch }: any, authToken: string) {
      commit(mutationTypes.SET_AUTH_TOKEN, authToken);
      dispatch('user/updateHTTPClientAuthToken');
    },
    setUser({ commit }: any, user: any) {
      commit(mutationTypes.SET_USER, user);
    },
    bookmarkProject({ commit, getters }: any, projectId: string) {
      (this as any)._vm.$http
        .put(`/users/${getters.getUser._id}/bookmark/${projectId}`)
        .then(({ data: { data } }: any) => {
          commit(mutationTypes.ADD_BOOKMARKED_PROJECT, data.bookmarkedProjects || []);
        });
    },
    updateHTTPClientAuthToken({ commit }: any) {
      commit(mutationTypes.SET_HTTP_CLIENT_AUTH_TOKEN);
    },
  },
  namespaced: true,
};

export default userModule;
