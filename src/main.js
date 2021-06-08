import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/socket.io.js'
import './plugins/element.js'
import './plugins/echarts'
import '@/styles/index.scss'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
