// 1.引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入组件
import Login from './components/login/Login.vue'
import Home from './components/home/Home.vue'

Vue.use(VueRouter)

// 2.实例化路由
const router = new VueRouter({
  // 规则
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
export default router
