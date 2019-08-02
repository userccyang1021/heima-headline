// 职责:初始化路由对象 提供main.js使用
// 路由页面使用vue-router必须先引入vue模块和vue-router模块
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
// 在vue-cli中使用router必须添加Vue.use(VueRouter)
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      // 跳转路由的两种方式 $router.push('/login')或$router.push({name:'login'})
      path: '/login',
      name: 'login',
      //   component对应的是登录组件，所以要把登录组件导入
      component: Login
    }
  ]
})
export default router
