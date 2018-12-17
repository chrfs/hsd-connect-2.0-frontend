import * as mutationTypes from './mutationTypes'

const userModule = {
  state: {
    projects: []
  },
  getters: {
    getProjects (state) {
      return state.projects
    }
  },
  mutations: {
    [mutationTypes.SET_PROJECTS] (state, projects) {
      state.projects = projects
    }
  },
  actions: {
    setProjects ({ commit }, projects) {
      commit(mutationTypes.SET_PROJECTS, projects)
    }
  },
  namespaced: true
}

export default userModule
