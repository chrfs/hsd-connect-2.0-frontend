import Route from 'vue-routisan'

Route.setViewResolver(component => require('../views/' + component).default)
Route.view('/', 'main/Index').options({
  alias: '/index'
})

export default Route.all()
