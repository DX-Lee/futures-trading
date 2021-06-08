<template>
  <div class="navbar">
    <el-menu
    class="navbar-menu"
    mode='horizontal'
    background-color = '#545c64'
    text-color = '#fff'
    active-text-color = '#ffd04b'
    default-active="/home"
    :router="true"
    >
      <el-menu-item index='logo'>林科大期货平台</el-menu-item>
      <el-submenu index='center'>
        <template slot="title">个人中心</template>
        <el-menu-item index='/user'>账号管理</el-menu-item>
        <el-menu-item @click='handleLoginOut'>退出</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index='/orders'>持仓</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleLoginOut () {
      localStorage.removeItem('token')
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    min-width: 1080px;
    height: 60px;
    position: relative;
    .navbar-menu {
      padding: 0 40px;
    }
  }
</style>
