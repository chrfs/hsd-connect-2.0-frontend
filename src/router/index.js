import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/Index.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
    path: '/welcome',
    component: Index,
    alias: '/'
  }],
  linkExactActiveClass: 'active-link'
});
