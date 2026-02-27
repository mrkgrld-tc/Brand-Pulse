import './assets/css/main.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import vuetify from './plugin/vuetify'
import pinia from './plugin/pinia'
import echartsPlugin from './plugin/echarts'
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.component('v-chart', echartsPlugin)
app.mount('#app')