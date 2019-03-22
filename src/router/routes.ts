import store from '../store'
import Welcome from '../views/Welcome.vue'
import Projects from '../views/Projects.vue'
import ProjectDetails from '../views/ProjectDetails.vue'
import ProjectCreateEdit from '../views/ProjectCreateEdit.vue'
import NotFound from '../views/NotFound.vue'

const ensureAuthenticated = (equalsBoolean: boolean, redirectTo: string) => {
  return (to: any, from: any, next: any) => {
    if (!!store.getters['user/getAuthToken'] === equalsBoolean) {
      next(redirectTo)
      return
    }
    next()
  }
}

const routes = [
  {
    name: 'Welcome',
    path: '/welcome',
    component: Welcome,
    alias: ['/welcome/signup', '/welcome/signin', '/welcome/about'],
    meta: {
      beforeEnter: {
        ensureAuthenticated: ensureAuthenticated(true, '/')
      }
    }
  },
  {
    name: 'Index',
    path: '/',
    component: Projects,
    meta: {
      beforeEnter: {
        ensureAuthenticated: ensureAuthenticated(false, '/welcome')
      }
    }
  },
  {
    name: 'ProjectCreateEdit',
    path: '/projects/create',
    component: ProjectCreateEdit,
    meta: {
      formStatus: 'create',
      beforeEnter: {
        ensureAuthenticated: ensureAuthenticated(false, '/welcome/signin')
      }
    }
  },
  {
    name: 'ProjectEdit',
    path: '/projects/:id/edit',
    component: ProjectCreateEdit,
    meta: {
      formStatus: 'edit',
      beforeEnter: {
        ensureAuthenticated: ensureAuthenticated(false, '/welcome/signin')
      }
    }
  },
  {
    name: 'ProjectDetails',
    path: '/projects/:id',
    component: ProjectDetails,
    meta: {
      beforeEnter: {
        ensureAuthenticated: ensureAuthenticated(false, '/welcome/signin')
      }
    }
  },
  {
    name: 'NotFound',
    path: '/*',
    component: NotFound
  }
]

export default routes
