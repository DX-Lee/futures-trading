<template>
  <div class="login-container">
    <div class="login-form-container">
      <div class="form-title">
        {{title}}
      </div>
    <el-tabs v-model="activeName">
        <el-tab-pane label='注册' name="register">
        <el-form :model="registerForm" class="register-form">
          <el-form-item>
            <el-input clearable v-model="registerForm.account" placeholder="账号"></el-input>
          </el-form-item>
        <el-form-item>
          <el-input show-password v-model="registerForm.password" placeholder="密码">
          </el-input>
          </el-form-item>
        <el-form-item>
          <el-input show-password v-model="registerForm.reviewPassword" placeholder="再次确认密码">
          </el-input>
        </el-form-item>
        <el-button style="width: 100%" type="primary" @click="handleRegister">注册</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label='登陆' name="login">
        <el-form :model="loginForm">
          <el-form-item>
            <el-input clearable v-model="loginForm.account" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input show-password v-model="loginForm.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-button style="width: 100%" type="primary" @click="handleLogin">登陆</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '林科大期货平台',
      codeText: '获取验证码',
      activeName: 'register',
      registerForm: {
        account: '',
        password: '',
        reviewPassword: ''
      },
      loginForm: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    verifyRegister () {
      if (this.registerForm.password === '') {
        this.$message({
          message: '密码不能为空'
        })
        return false
      }
      if (this.registerForm.password !== this.registerForm.reviewPassword) {
        this.$message({
          message: '密码输入不一致'
        })
        return false
      }
      return true
    },
    async handleRegister () {
      if (!this.verifyRegister()) {
        return
      }
      try {
        const result = await this.$store.dispatch('onRegister', this.registerForm)
        if (result.code === 200) {
          this.$router.push({
            path: '/home'
          })
        } else {
          this.$message({
            message: result.message
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async handleLogin () {
      if (this.loginForm.password === '') {
        this.$message({
          message: '密码不能为空'
        })
        return
      }
      try {
        const result = await this.$store.dispatch('onLogin', this.loginForm)
        if (result.code === 200) {
          this.$router.push({
            path: '/home'
          })
        } else {
          this.$message({
            message: result.message
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss">
.login-container {
  .el-input {
    display: inline-block;
  }
  .login-form-container {
    width: 300px;
    margin: 80px auto 0px;
    padding: 40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    .form-title {
      text-align: center;
      font-weight: bold;
      margin: 10px 0px;
    }
    .el-tabs__header{
      text-align: center;
      .el-tabs__nav-wrap{
        display: inline-block;
      }
    }
  }
}

</style>
