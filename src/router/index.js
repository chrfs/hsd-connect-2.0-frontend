import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active-link'
})

router.beforeEach(function (to, from, next) {
  if (!to.meta && !to.meta.beforeEnter) {
    next()
  }
  if (to.meta.beforeEnter.authenticated) to.meta.beforeEnter.authenticated(to, from, next)
})

export default router
