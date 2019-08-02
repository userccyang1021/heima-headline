<!-- 创建login组件 -->
<!-- 组件创建成功后配置路由 -->
<!-- 组件下文档说明包含三块内容：属性 方法 事件 -->
<template>
  <div class="container">
    <el-card class="my-card">
      <!-- 登录页面logo -->
      <img src="../../assets/images/logo_index.png">
      <!-- 表单 -->
      <!-- 表单容器 :model动态绑定整个表单的数据对象 目的：以便后期做表单验证-->
      <!-- 校验：
      el-form 标签加属性  rules  指定的是 校验规则对象
      el-form-item 标签加属性 prop  指定校验的字段名称
      在表单数据对象的字段名称需要和校验规则中的字段名称保持一致 -->
      <el-form ref='loginForm' :model='loginForm' :rules='loginRules' status-icon>
        <!-- 表单项 -->
        <el-form-item prop='mobile'>
          <!-- 表单元素 -->
          <el-input v-model='loginForm.mobile' placeholder='请输入手机号'></el-input>
        </el-form-item>
        <el-form-item prop='code'>
          <!-- 表单元素 -->
          <el-input v-model='loginForm.code' placeholder='请输入验证码' style='width: 236px;margin-right: 10px'></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click='login()'>登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  //   自定义校验：
  // - validator 指定自定义校验函数
  // - 函数先申明再使用，在return之前定义
  // - 定义时候：约定
  //   - rule  规则对象
  //   - value 字段的值
  //   - callback 校验结束的回调函数
  //     - 校验失败  callback(new Error('提示信息'))
  //     - 校验成功 callback()

  data () {
    const checkMobile = (rule, value, callback) => {
      // 按照自定义校验规则校验value值 手机号：1开头 第二位3-9 最后9位数字结尾即可
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机格式不对'))
      callback()
    }
    return {
      // 表单的数据对象
      loginForm: {
        // 根据接口规则命名
        mobile: '',
        code: ''
      },
      // 校验规则的名字
      loginRules: {
        mobile: [
          {
            required: true, // 必填
            message: '请输入手机号', // 没填写时的校验提示信息
            trigger: 'blur'// 文本框失去焦点时触发的事件
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }

        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          },
          {
            len: 6,
            message: '请输入6位验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 整体校验：
    // - validate 是校验函数(element-ui组件提供的校验方法) 对整个表单进行校验，前提要先获取dom元素
    // - 别人组件的函数调用： 通过dom对象去调用
    // - 获取el-form组件的dom对象，ref="loginForm"
    // - this.$refs.loginForm.validate()

    login () {
      // 1. 对表单进行整体校验
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // console.log('success')
          // 2. 校验成功发请求 post方法的返回值是params对象 所以可以.then
          this.$http
            .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              // res 是响应对象/响应报文 包含三个内容：响应状态行 响应头 响应体( 数据放在响应体里 )
              // console.log(res.data)
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('手机或验证码错误')
            })
        }
      })
    }
  }
}
</script>
<!-- 注：.vue文件才有scoped  style标签的属性scoped
        scoped在style下书写的样式 只在当前组件下有效 -->
<style scoped lang="less">
  .container {
    width: 100%;
    height: 100%;
    /* 宽高默认window窗口大小 */
    position: absolute;
    /* / 为连写 cover等比例缩放铺满容器多余被裁剪 contian等比例缩放 完全显示在当前容器 可能储存在六百 */
    background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
  }

  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);

  }

  img {
    width: 200px;
    display: block;
    margin: 0 auto 30px;
  }
</style>
