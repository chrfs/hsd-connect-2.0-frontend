import * as faIconsBrands from '@fortawesome/fontawesome-free-brands';
import * as faIconsRegular from '@fortawesome/fontawesome-free-regular';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as faIconsSolid from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import moment from 'moment';
import 'moment/locale/de';
import Vue from 'vue';
import App from './App.vue';
import env from './config/env';
import http from './http';
import i18n from './i18n';
import './registerServiceWorker';
import router from './router';
import store from './store';

const loadFontAwesomeIcons = (fontAwesomeIcons: any) => {
  Object.keys(fontAwesomeIcons).forEach(faIconName => {
    if (faIconName.startsWith('fa') && fontAwesomeIcons[faIconName].iconName) {
      library.add(fontAwesomeIcons[faIconName]);
    }
  });
};
loadFontAwesomeIcons(faIconsSolid);
loadFontAwesomeIcons(faIconsRegular);
loadFontAwesomeIcons(faIconsBrands);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = env.TYPE === 'production';
Vue.prototype.$http = http;
moment.locale('de');
Vue.prototype.$moment = moment;
Vue.prototype.$APIHost = env.API_HOST;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
