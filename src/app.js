import Vue from 'vue'

import './config/plugins'
import './config/filters'
import router from './config/router'

import app from './app.vue'



let vm = new Vue({
  el: '#app',
  router,
  created() {
    this.$http.interceptors.request.use(function (config) {
      // Do something before request is sent
      this.$Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      return config;
    }.bind(this), function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    this.$http.interceptors.response.use(function (response) {
      // Do something with response data
      this.$Indicator.close();
      return response;
    }.bind(this), function (error) {
      // Do something with response error
      return Promise.reject(error);
    });
  },
  render: c => c(app),
  dev: {

  }
})