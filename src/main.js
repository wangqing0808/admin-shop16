import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入element
import ElementUI from 'element-ui'
// 引入element样式
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'
// 引入axios
import axios from 'axios'
// 解决axios的几个问题 token headers
// 1.请求头token
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
// 2.路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 3.每次都引入axios
Vue.prototype.$axios = axios
// 配置element
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
