import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入element
import ElementUI from 'element-ui'
// 引入element样式
import 'element-ui/lib/theme-chalk/index.css'
import './assets/common.css'
// 配置element
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
