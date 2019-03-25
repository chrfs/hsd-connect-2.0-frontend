import * as mutationTypes from './mutationTypes'
import { ProjectNamespace } from '../models/Project'

const userModule = {
  state: {
    projects: [],
    project: {}
  },
  getters: {
    getProjects (state: any): ProjectNamespace.ProjectInterface[] {
      return state.projects
    },
    getProject (state: any): ProjectNamespace.ProjectInterface {
      return state.project
    }
  },
  mutations: {
    [mutationTypes.SET_PROJECTS] (state: any, projects: ProjectNamespace.ProjectInterface[]) {
      state.projects = projects
    },
    [mutationTypes.SET_PROJECT] (state: any, project: ProjectNamespace.ProjectInterface) {
      state.project = project
    },
    [mutationTypes.ADD_PROJECT_FEEDBACK_ENTRY] (state: any, feedbackEntry: ProjectNamespace.ProjectFeedbackInterface) {
      state.project.feedback.push(feedbackEntry)
    },
    [mutationTypes.UPDATE_PROJECT_FEEDBACK_ENTRY] (state: any, feedbackEntry: ProjectNamespace.ProjectFeedbackInterface) {
      state.project.feedback = state.project.feedback.map((el: ProjectNamespace.ProjectFeedbackInterface) => {
        return el._id === feedbackEntry._id ? Object.assign({}, el, feedbackEntry) : el
      })
    }
  },
  actions: {
    setProjects ({ commit }: any, projects: ProjectNamespace.ProjectInterface[]) {
      commit(mutationTypes.SET_PROJECTS, projects)
    },
    setProject ({ commit }: any, project: ProjectNamespace.ProjectInterface) {
      commit(mutationTypes.SET_PROJECT, project)
    },
    updateProjectFeedbackEntry ({ commit }: any, feedbackEntry: ProjectNamespace.ProjectFeedbackInterface) {
      commit(mutationTypes.UPDATE_PROJECT_FEEDBACK_ENTRY, feedbackEntry)
    },
    addProjectFeedbackEntry ({ commit }: any, feedbackEntry: ProjectNamespace.ProjectFeedbackInterface) {
      commit(mutationTypes.ADD_PROJECT_FEEDBACK_ENTRY, feedbackEntry)
    }
  },
  namespaced: true
}

export default userModule
