import Vue from 'vue';
import './plugins';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import App from './App';
import { global } from "./mixins/global.js";
Vue.prototype.$global = global;

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
