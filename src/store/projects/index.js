import * as mutationTypes from './mutationTypes'

const userModule = {
  state: {
    projects: [],
    project: {}
  },
  getters: {
    getProjects (state) {
      return state.projects
    },
    getProject (state) {
      return state.project
    }
  },
  mutations: {
    [mutationTypes.SET_PROJECTS] (state, projects) {
      state.projects = projects
    },
    [mutationTypes.SET_PROJECT] (state, project) {
      state.project = project
    }
  },
  actions: {
    setProjects ({ commit }, projects) {
      commit(mutationTypes.SET_PROJECTS, projects)
    },
    setProject ({commit}, project) {
      commit(mutationTypes.SET_PROJECT, project)
    }
  },
  namespaced: true
}

export default userModule
