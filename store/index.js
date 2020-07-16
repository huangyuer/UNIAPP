import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './models/app'
import user from './models/user'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,user
  },
  getters
})

export default store
