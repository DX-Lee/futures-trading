<template>
  <div class="list-item">
    <div class="title">
      <span style="color: red; font-size: 20px; font-weight: bold; margin-right: 20px;">{{orderInfo.name}}</span>
      <span style="color: #ccc; margin-right: 20px">{{orderInfo.code}}</span>
      <span style="margin-right: 40px;">{{orderInfo.count}}手</span>
      <span v-if='orderInfo.finished'>平仓时间: {{orderInfo.close_time}}</span>
      <span v-else>建仓时间: {{orderInfo.start_time}}</span>
    </div>
    <div class="content">
      <div style="font-size: 14px">
      <div style="margin-bottom: 10px;">
        <span style="margin-right: 20px">建仓价</span><span>{{orderInfo.open_price}}</span>
      </div>
      <div>
        <div v-if="orderInfo.finished">
          <span style="margin-right: 20px">平仓价</span><span>{{orderInfo.end_price || 0}}</span>
        </div>
        <div v-else>
          <span style="margin-right: 20px">最新价</span><span>{{orderInfo.currentPrice || 0}}</span>
        </div>
      </div>
      </div>
      <div>
        <div v-if="orderInfo.finished">
          <div style="margin-right: 20px">合约盈亏: {{orderInfo.income}}</div>
        </div>
        <div v-else>
        <div style="margin-right: 20px;display: inline-block;">
          <div style="text-align: center; font-size: 20px" :style="orderInfo.income < 0 ? 'color: green' : 'color: red'">{{orderInfo.income}}
          </div>
          <div style="margin-top: 10px; font-size: 14px">浮动盈亏</div>
        </div>
        <el-button  type="danger" @click="handleBtnClick">平仓</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderInfo: {
      type: Object
    }
  },
  methods: {
    handleBtnClick () {
      this.$confirm('确定平仓?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('close-order', {
          id: this.orderInfo._id,
          price: this.orderInfo.currentPrice,
          income: this.orderInfo.income
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  margin-top: 10px;
  .content {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
