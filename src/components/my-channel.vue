<template>
<!-- 封装下拉频道组件相关内容 -->
  <el-select :value="value" clearable placeholder="请选择" @change="fn">
    <!-- :key="item.value" 唯一标识 -->
    <!-- :label="item.label" 下拉框说明文字 -->
    <!-- :value="item.value" 下拉框说明文字后对应的值 -->
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
    //   myValue: null,
      channelOptions: []
    }
  },
  watch: {
    // watch监听data中的某项数据时 直接将属性名当做函数名即可
    'myValue' (newVal, oldVal) {
      // console.log(newVal)
      if (newVal === '') {
        this.myValue = null
      }
    }
  },
  created () {
    // 获取频道下拉选项数据
    this.getChanneloptions()
  },
  methods: {
    fn (val) {
      // 处理后端不支持空字符
      if (val === '') val = null
      // 拿到选中的值提交给父组件
      this.$emit('input', val)
    },
    // 获取文章频道列表数据的方法
    async getChanneloptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      // console.log({ data: { data } })
      // 获取频道下拉选项数据
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang='less'>
</style>
