// 职责:初始化路由对象 提供main.js使用
// 路由页面使用vue-router必须先引入vue模块和vue-router模块
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import notFound from '@/views/404'
import Store from '@/store'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
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
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home,
    //   redirect: '/welcome',
    //   children: [
    //     {
    //       path: '/welcome',
    //       name: 'welcome',
    //       component: Welcome
    //     }
    //   ]
    // }
    {
      path: '/',
      // name: 'home',
      component: Home,
      // redirect: '/welcome',
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image },
        { path: '/publish', name: 'publish', component: Publish },
        { path: '/comment', name: 'comment', component: Comment }
      ]
    },
    { path: '*', name: '404', component: notFound }
  ]
})
// 设置全局前置导航守卫
router.beforeEach((to, from, next) => {
  // if (to.path === '/Login') return next()
  // if (!Store.getUser().token) return next('/Login')
  // next()
  if (!to.path === '/Login' && !Store.getUser().token) return next('/Login')
  next()
})
export default router
