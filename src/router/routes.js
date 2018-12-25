import store from '../store'
import Welcome from '../views/Welcome'
import Projects from '../views/Projects'
import ProjectDetails from '../views/ProjectDetails'
import ProjectCreateEdit from '../views/ProjectCreateEdit'
import NotFound from '../views/NotFound'

const ensureAuthenticated = (equalsBoolean, redirectTo) => {
  return (to, from, next) => {
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
