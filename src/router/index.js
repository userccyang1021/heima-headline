// 职责:初始化路由对象 提供main.js使用
// 路由页面使用vue-router必须先引入vue模块和vue-router模块
import VueRouter from 'vue-router'
import Vue from 'vue'
// 在vue-cli中使用router必须添加Vue.use(VueRouter)
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '',
      name: ''
    }
  ]
})
export default router
