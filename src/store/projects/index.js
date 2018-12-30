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
    },
    [mutationTypes.ADD_PROJECT_FEEDBACK_ENTRY] (state, feedbackEntry) {
      state.project.feedback.push(feedbackEntry)
    },
    [mutationTypes.UPDATE_PROJECT_FEEDBACK_ENTRY] (state, feedbackEntry) {
      state.project.feedback = state.project.feedback.map(el => {
        return el._id === feedbackEntry._id ? Object.assign({}, el, feedbackEntry) : el
      })
    }
  },
  actions: {
    setProjects ({ commit }, projects) {
      commit(mutationTypes.SET_PROJECTS, projects)
    },
    setProject ({commit}, project) {
      commit(mutationTypes.SET_PROJECT, project)
    },
    updateProjectFeedbackEntry ({commit}, feedbackEntry) {
      commit(mutationTypes.UPDATE_PROJECT_FEEDBACK_ENTRY, feedbackEntry)
    },
    addProjectFeedbackEntry ({commit}, feedbackEntry) {
      commit(mutationTypes.ADD_PROJECT_FEEDBACK_ENTRY, feedbackEntry)
    }
  },
  namespaced: true
}

export default userModule
