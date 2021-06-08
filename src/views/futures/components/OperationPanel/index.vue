<template>
  <div>
    <el-row class="information" :gutter="20">
      <el-col :span="24">
        <span style="margin-right: 20px;font-size: 24px; color: red;">{{name}}</span>
        <span>{{code}}</span>
      </el-col>
      <el-col :span="24">日期:{{futuresInfo.date}}</el-col>
      <el-col :span="24" :class="computedIncrease > 0 ? 'up': 'down'">涨幅: {{computedIncrease}}%</el-col>
      <el-col :span="12">开盘价:{{futuresInfo.open}}</el-col>
      <el-col :span="12">收盘价:{{futuresInfo.close}}</el-col>
      <el-col :span="12">最高价:{{futuresInfo.high}}</el-col>
      <el-col :span="12">最低价:{{futuresInfo.low}}</el-col>
      <el-col :span="12">成交量:{{futuresInfo.volume}}</el-col>
      <el-col :span="12">成交额:{{futuresInfo.money}}</el-col>
      <el-col :span="12">涨停价:{{futuresInfo.high_limit}}</el-col>
      <el-col :span="12">跌停价:{{futuresInfo.low_limit}}</el-col>
      <el-col :span="12">当日均价:{{futuresInfo.avg}}</el-col>
      <el-col :span="12">持仓量:{{futuresInfo.open_interest}}</el-col>
    </el-row>
    <div class="operation">
      <el-row type="flex" style="margin-bottom: 20px">
        <span style="margin-right: 20px">市场价格</span>
        <span style="color: red">{{parseFloat(futuresInfo.close)}}</span>
      </el-row>
      <el-row style="margin-bottom: 20px">
        <span style="margin-right: 20px">手数</span>
        <el-input-number
          v-model="count"
          size="medium"
          label="手数"
          :min="0.05"
          :step="0.05"
          step-strictly
          :precision="2"
        ></el-input-number>
      </el-row>
      <el-row>
        <el-col>
          <el-button @click="dialogVisible = true" type="danger" style="width: 100%">市价买入</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="市价交易" :visible.sync="dialogVisible" width="30%" center>
      <div class="dialog-body">
        <p>
          <span class="label">交易品种</span>
          <span>{{name}}</span>
        </p>
        <p>
          <span class="label">交易价格</span>
          <span>{{futuresInfo.close}}</span>
        </p>
        <p>
          <span class="label">交易手数</span>
          <span>{{count}}</span>
        </p>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatTime, formatMoney } from '@/utils/format'
import { createOrder } from '@/api/trading'
export default {
  props: {
    code: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      count: 0.05,
      dialogVisible: false,
      futuresInfo: {}
    }
  },
  mounted () {
    this.initSocket()
  },
  computed: {
    computedIncrease () {
      return (
        ((this.futuresInfo.close - this.futuresInfo.pre_close) /
          this.futuresInfo.pre_close) *
        100
      ).toFixed(2)
    }
  },
  methods: {
    initSocket () {
      this.$socket.emit('get-futures-detail', {
        code: this.code,
        unit: '1d',
        count: 1,
        end_date: formatTime(new Date())
      })
      this.$socket.on('receive-futures-detail', data => {
        console.log(data)
        const result = data[0]
        this.futuresInfo = Object.assign(result, {
          money: formatMoney(result.money)
        })
      })
    },
    handleConfirm () {
      this.dialogVisible = false
      const data = {
        futures_code: this.code,
        futures_name: this.name,
        count: this.count,
        open_price: this.futuresInfo.close
      }
      createOrder(data).then(res => {
        this.$message({
          message: '订单生成成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.dialog-body {
  p {
    margin: 10px 0px;
  }
  .label {
    margin-right: 20px;
  }
}
</style>
<style lang="scss">
.information {
  margin: 20px 0px;
}
.el-col {
  margin-bottom: 10px;
  &.up {
    color: red;
  }
  &.down {
    color: green;
  }
}
</style>
