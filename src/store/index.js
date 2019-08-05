// 封装操作sessionStorage函数 提供给其他模块使用
const KEY = 'hm-toutiao'
export default {
  // 设置用户信息
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  //   存储用户信息
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  // 移除用户信息
  clearUser () {
    // sessionStorage.clear()清除所有用户信息
    window.sessionStorage.removeItem(KEY)
  }
}
