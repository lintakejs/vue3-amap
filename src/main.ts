import { createApp } from 'vue'
import App from './App.vue'
import Vue3Map from './index'

Vue3Map.initMapApiLoader({
  key: '17baa62a7cc987d619f80dbeaa723620',
  v: '2.0',
  plugin: ['AMap.PolylineEditor', 'AMap.PolygonEditor'],
})

const app = createApp(App)

app.use(Vue3Map)

app.mount('#app')
