// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

let config = eval("(" + fwConfigReader.read() + ")");

// elementUI
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// api
import api from './assets/api/api'
axios.defaults.baseURL = config.ServiceRoot ;
Vue.prototype.$api = api;


Vue.prototype.$url = config.ServerUrl ;
Vue.prototype.$axios = axios;

// 添加请求拦截器，在请求头中加
axios.interceptors.request.use(
    config => {
      if (localStorage.getItem('Authorization')) {
        config.headers['Authorization'] = localStorage.getItem('Authorization');
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    });

Vue.use( elementUI );

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
