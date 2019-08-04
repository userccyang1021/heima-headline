<template>
    <el-container class="wrapper">
        <el-aside :width="isCollapse? '64px': '200px'">
            <!-- logo -->
            <div class="logo" :class='{miniLogo:isCollapse}'></div>
            <!-- 导航菜单 -->
            <!-- el-menu 导航菜单容器   default-active 默认激活菜单项 指定的是菜单项的index属性的值 跳转属性router-->
            <el-menu :collapse='isCollapse' :collapse-transition='false' :default-active="$route.path" background-color="#002033"
                text-color="#fff" active-text-color="#ffd04b" router>
                <!-- el-submenu 菜单项包含子级菜单 -->
                <!-- el-menu-item 菜单项不包含子级菜单 -->
                <el-menu-item index="/">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/article">
                    <i class="el-icon-document"></i>
                    <span slot="title">内容管理</span>
                </el-menu-item>
                <el-menu-item index="/image">
                    <i class="el-icon-picture"></i>
                    <span slot="title">素材管理</span>
                </el-menu-item>
                <el-menu-item index="/publish">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">发布文章</span>
                </el-menu-item>
                <el-menu-item index="/comment">
                    <i class="el-icon-chat-dot-round"></i>
                    <span slot="title">评论管理</span>
                </el-menu-item>
                <el-menu-item index="/fans">
                    <i class="el-icon-present"></i>
                    <span slot="title">粉丝管理</span>
                </el-menu-item>
                <el-menu-item index="/setting">
                    <i class="el-icon-setting"></i>
                    <span slot="title">个人设置</span>
                </el-menu-item>

            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <span class="el-icon-s-fold" @click='toggleMenu()'></span>
                <span class="text">江苏传智播客科技教育有限公司</span>
                <!-- 下拉列表 -->
                <el-dropdown class="my-dropdown">
                    <span class="el-dropdown-link">
                        <img class='headPortrait' src="../../assets/images/avatar.jpg">
                        下拉列表<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <!-- slot 插槽 用于封装组件 -->
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <!-- 二级路由的出口 组件显示位置 -->
                <router-view></router-view>
                <!-- <router-view></router-view> -->
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="less">
    .wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        /* background-color: #ccc; */
    }

    .el-aside {
        background-color: #002033;
    }

    .el-header {
        line-height: 60px;
        border-bottom: 1px solid #ddd
    }

    .el-icon-s-fold {
        font-size: 24px;
        vertical-align: middle
    }

    .text {
        margin-left: 10px;
        vertical-align: middle
    }

    .my-dropdown {
        float: right;
    }

    .el-dropdown-link {
        font-weight: bold;
    }

    .headPortrait {
        width: 30px;
        height: 30px;
        vertical-align: middle
    }

    .logo {
        width: 100%;
        height: 60px;
        background: #002244 url(../../assets/images/logo_admin.png) no-repeat center / 140px auto
    }

    .miniLogo {
        background-image: url(../../assets/images/logo_admin_01.png);
        background-size: 36px auto;
    }

    .el-menu {
        border-right: none
    }
</style>
