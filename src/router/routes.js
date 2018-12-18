import store from '../store'
import Welcome from '../views/Welcome'
import Projects from '../views/Projects'
import ProjectDetails from '../views/ProjectDetails'
import ProjectCreate from '../views/ProjectCreate'
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
    name: 'ProjectCreate',
    path: '/projects/create',
    component: ProjectCreate,
    meta: {
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
