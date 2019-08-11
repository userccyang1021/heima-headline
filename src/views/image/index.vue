<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn-box">
        <el-radio-group v-model="reqParams.collect" @change="changeCollect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialog()" type="success" size="small" style="float:right">添加素材</el-button>
      </div>
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer" v-show="!reqParams.collect">
            <span @click='toggleCollect(item)' class="el-icon-star-off" :class="{selected:item.is_collected}"></span>
            <span @click='deleteImg(item.id)' class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- v-if="total>reqParams.per_page" -->
      <!-- :current-page='reqParams.page'当前页是第几页 -->
      <el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers='headers'
        name='image'
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Store from '@/store'
export default {
  data () {
    return {
      // 请求参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 定义素材列表
      images: [],
      // 总条数
      total: 0,
      // 声明数据控制对话框显示与隐藏
      dialogVisible: false,
      // 上传成功后图片的地址
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${Store.getUser().token}`
      }
    }
  },
  // 组件初始化时要拿后端数据 避免网页留白
  created () {
    // 从后端获取素材列表
    this.getImages()
  },
  methods: {
    // 删除图片
    deleteImg (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {})
    },
    // 切换收藏
    async toggleCollect (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, {
        //  接口要求请求体带字段
        collect: !item.is_collected
      })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      // 更新当前图片状态
      item.is_collected = data.collect
    },
    // 上传成功
    handleSuccess (res) {
      // 获取上传成功的url地址 res.data.url
      // 1. 预览
      this.imageUrl = res.data.url
      // 2. 提示
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // 3. 2s后关闭对话框
        this.dialogVisible = false
        // 4. 2s后更新列表 并且更新后的图片都靠前显示
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    // 打开对话框
    openDialog () {
      // console.log(1)
      this.imageUrl = null
      this.dialogVisible = true
    },
    // 改变全部与收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页函数
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      // 赋值素材列表
      this.images = data.results
      // 分页总条数赋值
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.img-list {
  margin-top: 20px;
}
.img-item {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  position: relative;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    width: 100%;
    text-align: center;
    span {
      margin: 0 20px;
      &.selected {
        color: #f00;
      }
    }
  }
}
</style>
