import Route from 'vue-routisan'
import store from '../store'

const checkLoggedIn = (equalsBoolean, redirectTo) => {
  return (to, from, next) => {
    if (!!store.getters.authToken === equalsBoolean) {
      next(redirectTo)
      return
    }
    next()
  }
}

Route.setViewResolver(componentName => require('../views/' + componentName).default)
Route.view('/', 'Index')
Route.view('/signup', 'Index').guard(checkLoggedIn(true, '/'))
Route.view('/signin', 'Index').guard(checkLoggedIn(true, '/'))
Route.view('/about', 'Index').guard(checkLoggedIn(true, '/'))

Route.group({ prefix: '/projects' }, () => {
  // Route.view('/create', 'ProjectCreate')
  Route.view('/:id', 'ProjectDetails').guard(checkLoggedIn(false, '/signin'))
})

export default Route.all()

// Welcome   /
// Welcome/Login      /signin
// Welcome/Register   /signup
// Welcome/About      /about
// Projects           /
// ProjectDetails     /projects/:id
// ProjectEdit        /projects/:id/edit
// ProjectCreate      /projects/create
