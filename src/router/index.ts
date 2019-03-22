import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active-link'
})

router.beforeEach(function (to, from, next) {
  if (to.meta.beforeEnter && to.meta.beforeEnter.ensureAuthenticated) {
    to.meta.beforeEnter.ensureAuthenticated(to, from, next)
    return
  }
  next()
})

export default router
