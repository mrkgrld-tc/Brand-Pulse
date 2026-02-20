// plugins/echarts.js
import * as echarts from 'echarts'
import VueECharts from 'vue-echarts'

export default {
  install(app) {
    app.component('v-chart', VueECharts)
    app.config.globalProperties.$echarts = echarts
  }
}
