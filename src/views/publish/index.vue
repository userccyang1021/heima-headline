<template>
  <div class="article-container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改':'发布'}}文章</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <!-- 富文本 -->
          <quill-editor :options="editorOption" v-model="articleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="changetype">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 使用选择图片组件 -->
          <!-- <my-image v-model="articleForm.cover.images[0]"></my-image> -->
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <!-- 没有id发表 -->
        <el-form-item v-if='!articleId'>
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <!-- 有id修改 -->
        <el-form-item v-else>
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 指定成员导入组件
import { quillEditor } from 'vue-quill-editor'
export default {
  // 注册
  components: {
    quillEditor
  },
  data () {
    return {
      // 文章数据
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      // 富文本配置
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      // 地址栏的文章Id
      articleId: null
    }
  },
  created () {
    this.articleId = this.$route.query.id
    // 如果id在地址栏存在 则代表修改逻辑 才有必要去获取文章数据
    if (this.articleId) {
      this.getArticle()
    }
  },
  watch: {
    // 注：监听data中的数据变化，this.$route属于响应式数据
    $route () {
      if (!this.$route.query.id) {
        this.articleId = null
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  methods: {
    // 获取文章数据
    async getArticle () {
      const { data: { data } } = await this.$http.get('article/' + this.articleId)
      this.articleForm = data
    },
    // 切换封面类型时重置图片数据
    changetype () {
      this.articleForm.cover.images = []
    },
    // 发表或者存入草稿
    async submit (draft) {
      // 发请求
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      // 提示
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // 跳转内容管理
      this.$router.push('/article')
    },
    // 修改或者存入草稿
    async update (draft) {
      // 发请求
      await this.$http.put(`articles?/${this.articleId}draft=${draft}`, this.articleForm)
      // 提示
      this.$message.success(draft ? '修改存入草稿成功' : '修改成功')
      // 跳转内容管理
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang='less'></style>
