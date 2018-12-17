import Vue from 'vue'
import Vuex from 'vuex'
import vuexPersistentStorage from 'vuex-persistedstate'
import user from './user'
import projects from './projects'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    projects
  },
  strict: true,
  plugins: [
    vuexPersistentStorage({
      key: 'hsdconnect',
      paths: ['user']
    })
  ]
})
