// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'


// elementUI
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// api
import api from './assets/api/api'
axios.defaults.baseURL = 'http://www.reception.com';
Vue.prototype.$api = api;

Vue.prototype.$axios = axios;

Vue.use( elementUI );

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
