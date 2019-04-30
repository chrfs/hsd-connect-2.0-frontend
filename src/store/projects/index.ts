import { ProjectFeedbackInterface, ProjectInterface } from '../models/Project';
import * as mutationTypes from './mutationTypes';

const userModule = {
  state: {
    projects: [],
    project: {}
  },
  getters: {
    getProjects(state: any): ProjectInterface[] {
      return state.projects;
    },
    getProject(state: any): ProjectInterface {
      return state.project;
    }
  },
  mutations: {
    [mutationTypes.SET_PROJECTS](state: any, projects: ProjectInterface[]) {
      state.projects = projects;
    },
    [mutationTypes.SET_PROJECT](state: any, project: ProjectInterface) {
      state.project = project;
    },
    [mutationTypes.ADD_PROJECT_FEEDBACK_ENTRY](state: any, feedbackEntry: ProjectFeedbackInterface) {
      state.project.feedback.push(feedbackEntry);
    },
    [mutationTypes.UPDATE_PROJECT_FEEDBACK_ENTRY](state: any, feedbackEntry: ProjectFeedbackInterface) {
      state.project.feedback = state.project.feedback.map((el: ProjectFeedbackInterface) => (el._id === feedbackEntry._id ? Object.assign({}, el, feedbackEntry) : el));
    }
  },
  actions: {
    setProjects({ commit }: any, projects: ProjectInterface[]) {
      commit(mutationTypes.SET_PROJECTS, projects);
    },
    setProject({ commit }: any, project: ProjectInterface) {
      commit(mutationTypes.SET_PROJECT, project);
    },
    updateProjectFeedbackEntry({ commit }: any, feedbackEntry: ProjectFeedbackInterface) {
      commit(mutationTypes.UPDATE_PROJECT_FEEDBACK_ENTRY, feedbackEntry);
    },
    addProjectFeedbackEntry({ commit }: any, feedbackEntry: ProjectFeedbackInterface) {
      commit(mutationTypes.ADD_PROJECT_FEEDBACK_ENTRY, feedbackEntry);
    }
  },
  namespaced: true
};

export default userModule;
