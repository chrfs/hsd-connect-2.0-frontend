import store from '../store'
import Welcome from '../views/Welcome'
import Projects from '../views/Projects'
import ProjectDetails from '../views/ProjectDetails'

const checkAuthenticated = (equalsBoolean, redirectTo) => {
  return (to, from, next) => {
    if (!!store.getters.authToken === equalsBoolean) {
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
        authenticated: checkAuthenticated(true, '/')
      }
    }
  },
  {
    name: 'Index',
    path: '/',
    component: Projects,
    meta: {
      beforeEnter: {
        authenticated: checkAuthenticated(false, '/welcome')
      }
    }
  },
  {
    name: 'ProjectDetails',
    path: '/projects/:id',
    component: ProjectDetails,
    meta: {
      beforeEnter: {
        authenticated: checkAuthenticated(false, '/welcome/signin')
      }
    }
  }
]

export default routes
