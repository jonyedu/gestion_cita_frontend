import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app';
import auth from './modules/auth';
import pet from './modules/pet';
import appointment_medical from './modules/appointment_medical';
import plugins from '@/plugins/secure-ls';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    auth,
    pet,
    appointment_medical,
  },
  plugins,
})

export default store;