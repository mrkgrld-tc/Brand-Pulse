import './assets/main.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import vuetify from './plugin/vuetify'
import pinia from './plugin/pinia'
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')