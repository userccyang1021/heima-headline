import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from '@/api'
import myPlugin from '@/components'
// @是一个路径的别名 是src路径( @在vue-cli项目下才有效，webpack打包时会加上这个别名 )
// index是目录的索引文件 默认使用的索引文件
// index.js index.vue index.json(只有此三种文件会默认加载 @绝对路径时会按此顺序获取文件)
import router from '@/router'
// 导入样式 (直接写路径即可 因为css js less没有返回值 不要去接收 直接导入)
import '@/styles/index.less'
Vue.use(myPlugin)
// 挂载到Vue上
Vue.prototype.$http = axios
// 产品级别提示( 开发阶段提示越详细越好 开发级别提示 )
Vue.config.productionTip = false
Vue.use(ElementUI)
// main.js入口文件( 全局的要在main.js引入 )
// 职责1：引入需要依赖的模块( js,包,css,其他资源 )
// 职责2：创建一个根vue实例
new Vue({
  // 是一个vue的配置项 指向的是函数
  // render的优先级最高 相比el template
  render: h => h(App),
  // render:function(createElement){
  //   return createElement(App)
  // } $mount挂载 把render的内容挂载到哪个容器( 次render内容挂载到index.html容器 )
  router
}).$mount('#app')
