<template>
  <!-- 筛选区域 -->
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb> -->
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <!-- v-model对应的是:label后的值 -->
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <!-- :key="item.value" 唯一标识 -->
            <!-- :label="item.label" 下拉框说明文字 -->
            <!-- :value="item.value" 下拉框说明文字后对应的值 -->
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
            <!-- type="daterange" 日期范围 -->
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type='primary'>筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 测试区域 -->
    <!-- slot="content" 指定插槽的名称 -->
    <!-- slot-scope="scope" 指定接收插槽传递过来的所有的自定义属性和值的集合数据(对象) -->
    <my-test>
      <!-- Vue 2.6.0后新写法
      v-slot指令
      v-slot:插槽名称 和slot属性一样作用
      v-slot='数据名称' 和slot-scope属性一样作用 -->
      <!-- <div slot="content" slot-scope="scope">content 获取组件内部的数据：{{scope.msg}}</div> -->
      <template v-slot:content='scope'>content 获取组件内部的数据：{{scope.msg}}</template>
      <div slot="footer">footer</div>
    </my-test>
  </div>
</template>

<script>
// import MyTest from '@/components/my-test'
// import MyBread from '@/components/my-bread'
export default {
  // components: { MyTest, MyBread },
  data () {
    return {
      // 收集请求参数(表单数据)
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道下拉选项数据
      channelOptions: [{ label: 'js', value: '1000' }],
      dateArr: []
    }
  }
}
</script>

<style scoped lang='less'></style>
