import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store/index'

import axios from 'axios'
// 允许跨域
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://a296148l31.zicp.vip'
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
