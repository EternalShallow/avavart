import { createStore } from 'vuex'
import getters from './getters'
import system from './modules/system'
import user from './modules/user.js'

export default createStore({
  state: {
    lang: ''
  },
  mutations: {
  },
  actions: {
  },

  modules: {
    system,
    user
  },
  getters
})
