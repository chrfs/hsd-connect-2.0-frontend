import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import axiosClient from './axios-client.mjs';

Vue.config.productionTip = false;
Vue.prototype.$http = axiosClient;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
