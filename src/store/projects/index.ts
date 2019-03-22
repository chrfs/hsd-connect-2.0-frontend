import * as mutationTypes from './mutationTypes'
import { Feedback, Project } from '../models/Project'

const userModule = {
  state: {
    projects: [],
    project: {}
  },
  getters: {
    getProjects (state: any): Project[] {
      return state.projects
    },
    getProject (state: any): Project {
      return state.project
    }
  },
  mutations: {
    [mutationTypes.SET_PROJECTS] (state: any, projects: Project[]) {
      state.projects = projects
    },
    [mutationTypes.SET_PROJECT] (state: any, project: Project) {
      state.project = project
    },
    [mutationTypes.ADD_PROJECT_FEEDBACK_ENTRY] (state: any, feedbackEntry: Feedback) {
      state.project.feedback.push(feedbackEntry)
    },
    [mutationTypes.UPDATE_PROJECT_FEEDBACK_ENTRY] (state: any, feedbackEntry: Feedback) {
      state.project.feedback = state.project.feedback.map((el: Feedback) => {
        return el._id === feedbackEntry._id ? Object.assign({}, el, feedbackEntry) : el
      })
    }
  },
  actions: {
    setProjects ({ commit }: any, projects: Project[]) {
      commit(mutationTypes.SET_PROJECTS, projects)
    },
    setProject ({ commit }: any, project: Project) {
      commit(mutationTypes.SET_PROJECT, project)
    },
    updateProjectFeedbackEntry ({ commit }: any, feedbackEntry: Feedback) {
      commit(mutationTypes.UPDATE_PROJECT_FEEDBACK_ENTRY, feedbackEntry)
    },
    addProjectFeedbackEntry ({ commit }: any, feedbackEntry: Feedback) {
      commit(mutationTypes.ADD_PROJECT_FEEDBACK_ENTRY, feedbackEntry)
    }
  },
  namespaced: true
}

export default userModule
