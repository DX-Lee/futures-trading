import * as echarts from 'echarts/core'
import Vue from 'vue'
import {
  CandlestickChart, LineChart
} from 'echarts/charts'

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'

import {
  CanvasRenderer
} from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CandlestickChart,
  CanvasRenderer,
  LegendComponent,
  DataZoomComponent,
  LineChart
])

Vue.prototype.$echarts = echarts
