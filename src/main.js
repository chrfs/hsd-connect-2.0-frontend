import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/de'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import './registerServiceWorker'
import http from './http'
import env from './config/env'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as faIconsSolid from '@fortawesome/free-solid-svg-icons'
import * as faIconsRegular from '@fortawesome/fontawesome-free-regular'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const loadFontAwesomeIcons = (fontAwesomeIcons) => {
  Object.keys(fontAwesomeIcons).forEach(faIconName => {
    if (faIconName.startsWith('fa') && fontAwesomeIcons[faIconName].iconName) {
      library.add(fontAwesomeIcons[faIconName])
    }
  })
}
loadFontAwesomeIcons(faIconsSolid)
loadFontAwesomeIcons(faIconsRegular)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = env.Type === 'production'
Vue.prototype.$http = http
moment.locale('de')
Vue.prototype.$moment = moment
Vue.prototype.$APIHost = env.API_HOST

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
