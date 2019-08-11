<template>
  <!-- 筛选区域 -->
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>-->
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
          <!-- <el-select v-model="reqParams.channel_id" clearable placeholder="请选择">
            :key="item.value" 唯一标识
            :label="item.label" 下拉框说明文字
            :value="item.value" 下拉框说明文字后对应的值
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select> -->
          <!-- 使用自己的组件 -->
           <!-- v-model="reqParams.channel_id"
           相当于v-bind:value='reqParams.channel_id' 和@input='reqParams,channel_id='数据'-->

          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期:">
          <!-- type="daterange" 日期范围 -->
          <!-- 转换后端需要的日期格式value-format='yyyy-MM-dd' -->
          <el-date-picker
          @change="changeDate"
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format='yyyy-MM-dd'
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='search()'>筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到{{total}}条结果：</div>
      <!-- 表格组件 -->
      <!-- :data="articles" 表格要依赖的数据 数组类型 -->
      <el-table :data="articles">
        <!-- el-table-column 列组件 prop="id" 指定数据的字段名 label="编号" 标题 -->
        <!-- prop为指定获取某个字段的值 不会生成额外的结构 要在一个组件内插入额外内容需定义作用域插槽 -->
        <el-table-column label="封面">
          <!-- articles是组件外部数据，传递给el-table组件，进行数据的遍历，拿每一次遍历的当前项数据
          通过row属性绑定给插槽，在外部是每一项数据，slot-scope="scope"  scope.row获取遍历的每一项数据-->
          <template slot-scope="scope">
            <!-- <img :src="scope.row.cover.images[0]"  /> -->
            <el-image :src="scope.row.cover.images[0]" style="width:120px;height:80px" fit="cover">
              <div slot="error">
                <img src="../../assets/images/error.gif" alt style="width:120px;height:80px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" plain circle></el-button>
            <el-button type="danger" @click="del(scope.row.id)" icon="el-icon-delete" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center;margin-top:30px">
        <!-- layout 布局 prev上一页 next下一页 pager中间页码 total总条数 -->
        <el-pagination
          background
          layout="prev, pager, next, total"
          :total="total"
          :page-size="reqParams.pre_page"
          :current-page='reqParams.page'
          @current-change='changePager'
        ></el-pagination>
      </div>
    </el-card>
    <!-- 测试区域 -->
    <!-- slot="content" 指定插槽的名称 -->
    <!-- slot-scope="scope" 指定接收插槽传递过来的所有的自定义属性和值的集合数据(对象) -->
    <!-- <my-test> -->
    <!-- Vue 2.6.0后新写法
      v-slot指令
      v-slot:插槽名称 和slot属性一样作用
    v-slot='数据名称' 和slot-scope属性一样作用-->
    <!-- <div slot="content" slot-scope="scope">content 获取组件内部的数据：{{scope.msg}}</div> -->
    <!-- <template v-slot:content='scope'>content 获取组件内部的数据：{{scope.msg}}</template>
      <div slot="footer">footer</div>
    </my-test>-->
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
        end_pubdate: null,
        page: 1,
        pre_page: 20
      },
      // 频道下拉选项数据
      // channelOptions: [],
      // 日期数据
      dateArr: [],
      // 文章列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  // 计算属性computed 当你需要一个新数据 依赖data中的数据得到，当data中的数据改变时，计算属性也发生改变
  // 侦听器watch 当你需要监听某个data数据改变，改变后做性能开销较大操作时(异步操作),也可以做其他事
  // 监听频道选项id
  // watch: {
  //   watch监听data中的某项数据时 直接将属性名当做函数名即可
  //   'reqParams.channel_id' (newVal, oldVal) {
  //     console.log(newVal)
  //     if (newVal === '') {
  //       this.reqParams.channel_id = null
  //     }
  //   }
  // },
  created () {
    // 获取频道下拉选项数据
    // this.getChanneloptions()
    // 获取文章列表数据
    this.getArticles()
  },
  methods: {
    edit (id) {
      // ???
      // 发布文章和编辑文章使用的是同一个路由规则
      // 如果使用params是路径传参 /publish
      // 使用query传参 /publish?id=10
      this.$router.push('/publish?id=' + id)
    },
    // 删除文章
    del (id) {
      // 1. 弹出一个确认框 2. 点击确认 发起删除请求 3. 删除成功提示更新

      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        await this.$http.delete(`articles/${id}`)
        this.$message.success('删除成功')
        this.getArticles()
        // })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    // 选择日期后函数
    changeDate (dateArr) {
      // dateArr[起始日期, 结束日期]
      // dateArr有清空功能 清空后的值为null 需处理
      // 把日期格式转换格式 使用moment插件
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选函数
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    // 页码改变事件函数
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 获取文章频道列表数据的方法
    // async getChanneloptions () {
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   console.log({ data: { data } })
    //   获取频道下拉选项数据
    //   this.channelOptions = data.channels
    // },
    async getArticles () {
      // 请求方式是get 传参url?key=value&key1=value1
      // 请求方式是get 第二个参数是一个对象 方法{ params:指定参数对象 }
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 获取文章列表
      this.articles = data.results
      // 获取总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
