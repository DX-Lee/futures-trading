<template>
  <div class="order-container">
    <div class="order-title">
      <div class="account">
        <div>账户净值</div>
        <div class="amount">{{computedMoney}}</div>
      </div>
      <div class="income">
        <div>持仓获利</div>
        <div class="amount" :style="computedIncome < 0 ? 'color: green' : 'color: red'">
          {{computedIncome}}
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="当前合约" name='current'>
    <div class="order-list">
      <div v-if="orderList.length">
        <order-item v-for="order in orderList" :key="order._id" :orderInfo='order' @close-order='handleCloseOrder'></order-item>
      </div>
      <div class="no-result" v-else>暂无订单</div>
    </div>
      </el-tab-pane>
      <el-tab-pane label="历史合约" name="history">
        <div class="order-list">
        <div v-if="historyList.length">
          <order-item v-for="order in historyList" :key='order._id' :orderInfo='order'></order-item>
        </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getOrders,
  getHistoryOrders,
  finishOrder
} from '@/api/trading'
import {
  formatTime
} from '@/utils/format'
import OrderItem from './components/OrderItem'
const BASE = 100
export default {
  data () {
    return {
      activeName: 'current',
      userAmount: this.$store.state.user.amount || 0,
      orderList: [],
      historyList: []
    }
  },
  created () {
    getOrders().then((res) => {
      if (res.code === 200) {
        this.orderList = res.data.map((item) => {
          return {
            _id: item._id,
            name: item.futures_name,
            code: item.futures_code,
            count: item.count,
            open_price: item.open_price,
            start_time: formatTime(new Date(item.create), true)
          }
        })
        this.$socket.emit('get-orders-price', {
          code: this.orderList.map((item) => {
            return item.code
          }),
          unit: '1m',
          count: 1,
          end_date: formatTime(new Date())
        })
        this.$socket.on('receive-orders-price', (res) => {
          this.orderList = this.orderList.map((item, index) => {
            const currentPrice = parseFloat(res[index].close)
            const income = parseFloat(((currentPrice - item.open_price) * item.count * BASE).toFixed(2))
            this.$set(item, 'currentPrice', currentPrice)
            this.$set(item, 'income', income)
            return item
          })
          console.log(this.orderList)
        })
      } else {
        this.$message({
          message: '获取订单失败',
          type: 'error'
        })
      }
    })
    getHistoryOrders().then(res => {
      if (res.code === 200) {
        this.historyList = res.data.map((item) => {
          return {
            _id: item._id,
            name: item.futures_name,
            code: item.futures_code,
            count: item.count,
            open_price: item.open_price,
            end_price: item.end_price,
            finished: item.finished,
            income: parseFloat(item.end_price) - parseFloat(item.open_price),
            close_time: formatTime(new Date(item.update), true)
          }
        })
        console.log(this.historyList)
      } else {
        this.$message({
          message: '获取信息失败',
          type: 'error'
        })
      }
    })
  },
  components: {
    OrderItem
  },
  computed: {
    computedMoney () {
      return this.userAmount + this.computedIncome || 0
    },
    computedIncome () {
      let total = 0
      this.orderList.forEach((item) => {
        total += item.income
      })
      return total || 0
    }
  },
  methods: {
    handleCloseOrder (data) {
      finishOrder({
        order_id: data.id,
        end_price: data.price,
        amount: this.userAmount + data.income
      }).then((res) => {
        if (res.code === 200) {
          const {
            order,
            user
          } = res.data
          const index = this.orderList.findIndex((item) => {
            return item._id === order._id
          })
          this.orderList.splice(index, 1)
          localStorage.setItem('user', JSON.stringify(user))
          this.$store.commit('setUser', user)
          this.userAmount = user.amount
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-container {
  margin: 10px auto;
  width: 800px;
  .order-title {
    display: flex;
    margin-top: 10px;
    border-radius: 4px;
    padding: 10px 20px;
    background-color: #fff;
    .amount {
      padding: 10px 0px;
      font-size: 28px;
      font-weight: bold;
    }
    .account {
      margin-right: 80px;
    }
  }
  .order-list {
    max-height: 500px;
    overflow: auto;
    .no-result {
      text-align: center;
    }
  }
}

</style>
