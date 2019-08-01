import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 产品级别提示( 开发阶段提示越详细越好 开发级别提示 )
Vue.config.productionTip = false
Vue.use(ElementUI)
// main.js入口文件( 全局的要在main.js引入 )
// 职责1：引入需要依赖的模块( js,包,css,其他资源 )
// 职责2：创建一个根vue实例
new Vue({
  // 是一个vue的配置项 指向的是函数
  // render的优先级最高 相比el template
  render: h => h(App)
  // render:function(createElement){
  //   return createElement(App)
  // } $mount挂载 把render的内容挂载到哪个容器( 次render内容挂载到index.html容器 )
}).$mount('#app')
