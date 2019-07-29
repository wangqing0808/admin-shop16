<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span="8">
          <img
            src="../../assets/logo.png"
            alt=""
          >
        </el-col>
        <el-col :span="8">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col
          :span="8"
          class="col3"
        >
          恭喜上海前端43期月薪20万 <a
            href="#"
            @click.prevent="logout"
          >退出</a>
        </el-col>
      </el-row>
    </el-header>
    <!-- 左侧边栏 -->
    <el-container>
      <el-aside width="200px">
        <el-menu
          :router='true'
          default-active="handleUrl()"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="users">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="roles">角色列表</el-menu-item>
              <el-menu-item index="rights">权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  methods: {
    logout () {
      this.$confirm('此操作将退出账户, 是否继续?, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800
        })
        localStorage.removeItem('token')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出',
          duration: 800
        })
      })
    },
    handleOpen () {
      console.log('打开了')
    },
    handleClose () {
      console.log('关闭了')
    },

    handleUrl () {
      return this.$route.path
    }
  }

}

</script>

<style scoped lang="less">
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c1cd;
  padding: 0;
  h1 {
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .col3 {
    text-align: right;
    line-height: 60px;
    padding-right: 30px;
    a {
      color: #daa520;
    }
  }
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #eaeef1;
}
</style>
