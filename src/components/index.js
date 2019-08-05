// 封装Vue插件
// 作用：注册components下的所有组件为全局组件
// Vue插件定义的规则 暴露一个对象{} 在对象中选项install对应的是一个函数 函数有形参 形参是一个Vue对象
import MyTest from '@/components/my-test'
import MyBread from '@/components/my-bread'
export default {
  install (Vue) {
    // Vue.use(使用插件) Vue就是你use前的Vue(谁使用这个插件，Vue就是谁)
    //   Vue为全局对象 接下来全局注册组件即可
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyTest.name, MyTest)
  }
}
