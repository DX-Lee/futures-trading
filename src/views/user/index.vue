<template>
  <div class="information-container">
    <div class="title">账号管理</div>
    <div style="padding-bottom: 20px;">
      <div class="information-list">
        <div class="item"><span>姓名:</span>{{userInfo.name}}</div>
        <div class="item"><span>账号:</span>{{userInfo.account}}</div>
        <div class="item"><span>手机号码:</span>{{userInfo.phone || '未设置'}}</div>
        <div class="item"><span>账户金额:</span>{{userInfo.amount}}</div>
      </div>
      <div style="text-align: center">
      <el-button type="primary" @click="dialogFormVisible = true">修改信息</el-button>
      </div>
    </div>
    <el-dialog title="信息修改" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" :label-width="formLabelWidth">
      <el-input v-model="form.phone" placeholder="输入手机号码">
      </el-input>
    </el-form-item>
  </el-form>
  <div slot="footer">
    <el-button @click="dialogFormVisible = false">取消</el-button>
    <el-button @click="handleUpdate">修改</el-button>
  </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      formLabelWidth: '120px',
      dialogFormVisible: false,
      form: {
        name: '',
        phone: ''
      }
    }
  },
  mounted () {
    this.form.name = this.userInfo.name
    this.form.phone = this.userInfo.phone
  },
  computed: {
    ...mapGetters({ userInfo: 'user' })
  },
  methods: {
    handleUpdate () {
      if (this.form.name === '') {
        this.$message({
          message: '用户名不能未空',
          type: 'error'
        })
        return
      }
      if (!/^1[3-9]\d{9}$/.test(this.form.phone)) {
        this.$message({
          message: '手机号不合法',
          type: 'error'
        })
        return
      }
      this.$store.dispatch('onUpdateUser', this.form).then((res) => {
        this.$message({
          message: '信息修改成功',
          type: 'success'
        })
        console.log(this.userInfo)
        this.dialogFormVisible = false
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '信息修改失败',
          type: 'warning'
        })
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.information-container{
  width: 600px;
  margin: 20px auto;
  background: #ffffff;
  .title {
    padding: 20px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
  }
  .information-list {
    padding: 10px;
    .item {
      padding: 10px 0px;
      span {
        margin-right: 20px;
        color: black;
      }
    }
  }
}
</style>
