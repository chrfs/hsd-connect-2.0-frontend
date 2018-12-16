import Vue from 'vue'
import VueKoaRouter from 'vue-router'
import routes from './routes'

Vue.use(VueKoaRouter)

const router = new VueKoaRouter({
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
