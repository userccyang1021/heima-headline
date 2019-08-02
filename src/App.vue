<template>
  <div id="app">
    <!-- 一级路由的出口 一级路由对应组件渲染的位置(整个页面都应该被看到,要放在根级组件下) -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less"></style>
