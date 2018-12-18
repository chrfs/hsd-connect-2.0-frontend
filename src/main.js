import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/de'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import http from './http'
import * as httpRoutes from './http/routes'
import env from './config/env'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as faIcons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Object.keys(faIcons).forEach(faIcon => {
  if (faIcon.startsWith('fa') && faIcons[faIcon].iconName) {
    library.add(faIcons[faIcon])
  }
})
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = env.Type === 'production'
Vue.prototype.$http = http
Vue.prototype.$httpRoutes = httpRoutes
moment.locale('de')
Vue.prototype.$moment = moment
Vue.prototype.$APIHost = env.API_HOST

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
