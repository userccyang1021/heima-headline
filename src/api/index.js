// 配置axios
import axios from 'axios'
import Store from '@/store'
// 基准路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 请求头字段
// 此代码只能拿一次token
// axios.defaults.headers = {
//   Authorization: `Bearer ${Store.getUser().token}`
// }
// 设置请求拦截器
axios.interceptors.request.use((config) => {
  // config 配置项对象
  config.headers = {
    Authorization: `Bearer ${Store.getUser().token}`
  }
  return config
}, (err) => {
  return Promise.reject(err)
})
// 设置响应拦截器
axios.interceptors.response.use((res) => {
  return res
}, (err) => {
  // 失败时获取响应状态码 err错误对象 err.response响应对象 err.response.status
  if (err.response.status === '401') {
    location.hash = '#/Login'
  }
  return Promise.reject(err)
})
export default axios
