<template>
  <el-container style="height: 100%">
    <el-main>
    <el-tabs v-model="currentUnit" @tab-click='handleTabsClick'>
      <el-tab-pane :lazy='true' v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name">
        <echarts-panel :unit='tab.name' :code='code'></echarts-panel>
      </el-tab-pane>
    </el-tabs>
    </el-main>
    <el-aside width='400px'>
    <operation-panel :code='code' :name='name'></operation-panel>
    </el-aside>
  </el-container>
</template>

<script>
import EchartsPanel from './components/EchartsPanel'
import OperationPanel from './components/OperationPanel'
export default {
  data () {
    return {
      code: '',
      name: '',
      currentUnit: '1m',
      tabs: [
        {
          label: '1分钟',
          name: '1m'
        },
        {
          label: '5分钟',
          name: '5m'
        },
        {
          label: '15分钟',
          name: '15m'
        },
        {
          label: '30分钟',
          name: '30m'
        },
        {
          label: '60分钟',
          name: '60m'
        },
        {
          label: '120分钟',
          name: '120m'
        },
        {
          label: '1天',
          name: '1d'
        },
        {
          label: '1周',
          name: '1w'
        },
        {
          label: '1月',
          name: '1M'
        }
      ]
    }
  },
  components: {
    EchartsPanel,
    OperationPanel
  },
  beforeMount () {
    this.code = this.$route.query.code
    this.name = this.$route.query.name
  },
  mounted () {
  },
  methods: {
    handleTabsClick (tab, event) {
      // console.log(tab)
    }
  }
}
</script>

<style>

</style>
