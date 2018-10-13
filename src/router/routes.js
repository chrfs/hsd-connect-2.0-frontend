import store from '../store'
import Index from '../views/Index.vue'
import ProjectDetails from '../views/ProjectDetails.vue'

const checkAuthenticated = (equalsBoolean, redirectTo) => {
  return (to, from, next) => {
    if (!!store.getters.authToken === equalsBoolean && from.path !== to.path) {
      next(redirectTo)
      return
    }
    next()
  }
}

const routes = [
  {
    name: 'Index',
    path: '/',
    component: Index,
    alias: ['/signup', '/signin', '/about'],
    meta: {
      beforeEnter: {
        authenticated: checkAuthenticated(true, '/')
      }
    }
  },
  {
    name: 'ProjectDetails',
    path: '/projects/:id',
    component: ProjectDetails,
    meta: {
      beforeEnter: {
        authenticated: checkAuthenticated(false, '/signin')
      }
    }
  }
]

export default routes
