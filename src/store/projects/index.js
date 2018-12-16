import * as mutationTypes from './mutationTypes'

const userModule = {
  state: {
    projects: [],
    newProject: {}
  },
  getters: {
    getProjects (state) {
      return state.user
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
