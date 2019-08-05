<template>
    <!-- 插槽 -->
    <!-- 默认插槽：只有一处内容需要额外插入 则使用默认插槽 -->
    <!-- 备用内容：当你可能不插入内容，需要默认的内容 -->
    <!-- 具名插槽：需要插入多处内容时则使用具名插槽 -->
    <!-- 作用域插槽：需要使用组件内部数据的时候，使用作用域插槽(组件内部的数据是相互独立的) -->
    <!-- 插槽作用：
        1. 自己封装组件  2. 读懂element-ui提供的组件 -->
    <div>
        <div class="header">header</div>
        <div class="content">
            <!-- 插槽 插槽不写名字则为默认插槽 如果<slot></slot>标签内有内容则为备用内容 -->
            <!-- 组件名标签内有内容要显示要用slot插槽 组件名标签内有内容则显示标签内内容 没有则显示插槽备用内容 -->
            <!-- 具名插槽 给slot标签name属性定义值 -->
            <slot name='content' :msg='msg'></slot>
        </div>
        <div class="footer">
            <slot name='footer'></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'my-test',
  data () {
    return {
      msg: '组件内部数据'
    }
  }
}
</script>

<style>

</style>
