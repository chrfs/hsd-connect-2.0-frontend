import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import http from './http'
import * as httpRoutes from './http/routes'
import env from './config/env'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle, faCog, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserCircle, faCog, faPowerOff)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = env.TYPE === 'production'
Vue.prototype.$http = http
Vue.prototype.$httpRoutes = httpRoutes

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
