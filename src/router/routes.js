import Route from 'vue-routisan'

Route.setViewResolver(component => require('../views/' + component).default)

Route.view('/', 'Index')

Route.view('/welcome', 'Welcome').options()

Route.group({ prefix: '/projects' }, () => {
  Route.view('/', 'Projects')
  Route.view('/:id', 'Project')
})

export default Route.all()
