<template>
  <div class="home-page">
    <div>
      <el-cascader
        v-model="value"
        :options='options'
        :props='{ expandTrigger: "hover" }'
        @change='handleSelectChange'
      ></el-cascader>
    </div>
    <el-table
    style="width: 100%"
    max-height='520px'
    :border='true'
    :stripe='true'
    :data='list'
    :row-class-name='tableRowClassName'
    @row-click="handleFuturesClick"
    >
    <el-table-column
    prop='name'
    label='期货合约'
    ></el-table-column>
    <el-table-column
    prop='date'
    label='日期'
    ></el-table-column>
    <el-table-column
    :formatter='_formatNumber'
    prop='open'
    label='开盘价'
    ></el-table-column>
    <el-table-column
    :formatter='_formatNumber'
    prop='close'
    label='收盘价'
    ></el-table-column>
    <el-table-column
    :formatter='_formatNumber'
    prop='high'
    label='最高价'
    ></el-table-column>
    <el-table-column
    :formatter="_formatNumber"
    prop='low'
    label='最低价'
    ></el-table-column>
    <el-table-column
    :formatter='_formatNumber'
    prop='volume'
    label='成交量'
    ></el-table-column>
    <el-table-column
    :formatter='_formatMoney'
    prop='money'
    label='成交额'
    ></el-table-column>
    <el-table-column
    :formatter='_formatNumber'
    prop='high_limit'
    label='涨停价'
    ></el-table-column>
    <el-table-column
    :formatter='_formatNumber'
    prop='low_limit'
    label='跌停价'
    ></el-table-column>
    <el-table-column
    prop='avg'
    label='当日均价'
    ></el-table-column>
    <el-table-column
    :formatter='_formatNumber'
    prop='open_interest'
    label='持仓量'
    ></el-table-column>
    </el-table>
    <div class="pagination">
    <el-pagination
      :total='currentTotal'
      :current-page='currentPage'
      :hide-on-single-page='true'
      @current-change='handlePageChange'
      layout='total, prev, pager, next, jumper'
    ></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getAllFuturesInfo
} from '@/api/product'
import {
  formatMoney,
  formatTime
} from '@/utils/format'
import * as futuresInfo from '@/config/futures'
export default {
  data () {
    return {
      list: [],
      value: ['0'],
      options: [],
      size: 10,
      currentTotal: 0,
      currentPage: 1
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    formatData (data) {
      return data.map((item) => {
        const arr = item.code.split('.')
        const id = arr[0].slice(0, arr[0].search(/\d/))
        return {
          code: item.code,
          type: arr[1],
          name: item.display_name,
          id
        }
      })
    },
    _formatMoney (row, column, cellValue, index) {
      if (!cellValue) {
        return '暂无数据'
      }
      return formatMoney(cellValue)
    },
    _formatNumber (row, column, cellValue, index) {
      if (!cellValue) {
        return '暂无数据'
      }
      return parseFloat(cellValue)
    },
    handlePageChange (page) {
      this.currentPage = page
      const currentList = this.currentData.slice((page - 1) * this.size, page * this.size)
      this.$socket.emit('get-multiple-price', {
        code: currentList.map(item => item.code),
        unit: '1d',
        count: 1,
        end_date: formatTime(new Date())
      })
    },
    handleSelectChange (value) {
      if (value[0] === '0') {
        this.currentData = this.originData.slice()
        this.currentPage = 1
        this.currentTotal = this.currentData.length
        const currentList = this.currentData.slice(0, this.currentPage * this.size)
        this.$socket.emit('get-multiple-price', {
          code: currentList.map(item => item.code),
          unit: '1d',
          count: 1,
          end_date: formatTime(new Date())
        })
      } else {
        this.currentData = this.originData.filter((item) => {
          return value[0] === item.type && (value[1] === '0' || value[1] === item.id)
        })
        this.currentPage = 1
        this.currentTotal = this.currentData.length
        const currentList = this.currentData.slice(0, this.currentPage * this.size)
        this.$socket.emit('get-multiple-price', {
          code: currentList.map(item => item.code),
          unit: '1d',
          count: 1,
          end_date: formatTime(new Date())
        })
      }
    },
    handleFuturesClick (row, col, event) {
      if (row.error) {
        return
      }
      this.$router.push({
        name: 'futures',
        query: {
          code: row.code,
          name: row.name
        }
      })
    },
    tableRowClassName ({ row, rowIndex }) {
      // 高亮停牌期货
      if (row.paused === '1') {
        return 'warning-row'
      }
      return ''
    },
    init () {
      this.initSocket()
      getAllFuturesInfo().then((res) => {
        if (res.code === 200) {
          this.originData = this.formatData(res.data)
          this.currentData = this.originData.slice()
          const currentList = this.currentData.slice((this.currentPage - 1) * this.size, this.currentPage * this.size)
          this.currentTotal = this.currentData.length
          this.$socket.emit('get-multiple-price', {
            code: currentList.map(item => item.code),
            unit: '1d',
            count: 1,
            end_date: formatTime(new Date())
          })
        }
      })
      const options = [{
        label: '全部',
        value: '0'
      }]
      for (const key in futuresInfo) {
        const obj = {}
        const futures = futuresInfo[key]
        obj.label = futures.label
        obj.value = futures.code
        obj.children = [{
          label: '全部',
          value: '0'
        }]
        for (const key in futures.children) {
          const childrenObj = {}
          childrenObj.label = futures.children[key]
          childrenObj.value = key
          obj.children.push(childrenObj)
        }
        options.push(obj)
      }
      this.options = options
    },
    initSocket () {
      this.$socket.on('receive-multiple-price', (data) => {
        const currentList = this.currentData.slice((this.currentPage - 1) * this.size, this.currentPage * this.size)
        const list = currentList.map((item, index) => {
          return Object.assign(data[index], { name: item.name, code: item.code })
        })
        this.list = list
      })
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
  .home-page {
    padding: 20px 120px;
    height: 100%;
    .pagination {
      margin-top: 20px;
    }
  }
</style>
<style>
.el-table .warning-row {
  background: #f56c6c
}
</style>
