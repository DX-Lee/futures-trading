<template>
    <div ref="container" class="panel"></div>
</template>

<script>
import {
  formatTime
} from '@/utils/format'
const upColor = '#ec0000'
const upBorderColor = '#8A0000'
const downColor = '#00da3c'
const downBorderColor = '#008F28'
export default {
  props: {
    code: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: '1m'
    }
  },
  mounted () {
    const myCharts = this.$echarts.init(this.$refs.container)
    const option = {
      xAxis: {
        data: []
      },
      yAxis: {},
      series: [{
        type: 'k',
        name: '日K',
        data: []
      }]
    }
    myCharts.setOption(option)
    myCharts.showLoading()
    this.myCharts = myCharts
    this.initSocket()
  },
  methods: {
    initSocket () {
      let count = 0
      let start = 80 // 图标数据范围起点
      switch (this.unit) {
        // 如果是 1m K线图获取过去12个小时的行情
        case '1m':
          count = 60 * 12
          start = 95
          break
        case '5m':
          count = 12 * 24
          start = 90
          break
        case '15m':
          count = 4 * 24 * 3
          start = 90
          break
        case '30m':
          count = 2 * 24 * 6
          start = 90
          break
        case '60m':
          count = 1 * 24 * 12
          start = 90
          break
        case '120m':
          count = 12 * 30
          start = 95
          break
        case '1d':
          count = 160
          start = 90
          break
        case '1w':
          count = 120
          start = 60
          break
        case '1M':
          count = 100
          start = 0
          break
      }
      this.$socket.emit('get-single-price', {
        code: this.code,
        unit: this.unit,
        count,
        end_date: formatTime(new Date())
      })
      this.$socket.on('receive-single-price', (res) => {
        // 如果不是当前周期数据直接返回
        if (res.unit !== this.unit) {
          return
        }
        const data = this.formatData(res.data)
        this.myCharts.hideLoading()
        const option = {
          title: {
            text: '期货行情' + this.unit
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data: ['日K', 'MA5', 'MA10', 'MA30']
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '10%'
          },
          xAxis: {
            type: 'category',
            data: data.categoryData,
            scale: true,
            boundaryGap: false,
            axisLine: {
              onZero: false
            },
            splitLine: {
              show: false
            },
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
          },
          yAxis: {
            scale: true,
            splitArea: {
              show: true
            }
          },
          dataZoom: [
            {
              type: 'inside',
              start,
              end: 100
            },
            {
              show: true,
              type: 'slider',
              top: '90%',
              start,
              end: 100
            }
          ],
          series: [
            {
              name: '日K',
              type: 'candlestick',
              data: data.values,
              itemStyle: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor
              }
            },
            {
              name: 'MA5',
              type: 'line',
              data: this.formatMAData(data.values, 5),
              smooth: true,
              lineStyle: {
                opacity: 0.5
              }
            },
            {
              name: 'MA10',
              type: 'line',
              data: this.formatMAData(data.values, 10),
              smooth: true,
              lineStyle: {
                opacity: 0.5
              }
            },
            {
              name: 'MA30',
              type: 'line',
              data: this.formatMAData(data.values, 30),
              smooth: true,
              lineStyle: {
                opacity: 0.5
              }
            }
          ]
        }
        this.myCharts.setOption(option, true)
      })
    },
    formatData (data) {
      const categoryData = []
      const values = []
      for (let i = 0; i < data.length; i++) {
        const {
          date,
          open,
          close,
          low,
          high
        } = data[i]
        categoryData.push(date)
        values.push([parseFloat(open), parseFloat(close), parseFloat(low), parseFloat(high)])
      }
      return {
        categoryData,
        values
      }
    },
    formatMAData (source, dayCount) {
      const result = []
      for (let i = 0, len = source.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-')
          continue
        }
        let sum = 0
        for (let j = 0; j < dayCount; j++) {
          sum += source[i - j][1]
        }
        result.push((sum / dayCount).toFixed(4))
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  height: 520px;
}

</style>
