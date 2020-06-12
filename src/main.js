import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/vant'
import axios from 'axios'
import api from './assets/config/api'
import './assets/css/global.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
