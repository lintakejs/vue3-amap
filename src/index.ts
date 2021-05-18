import { App } from 'vue'
import { initMapApiLoader } from './services/injected-map-api'
// 组件
import Map from './components/Map.vue'
import MapMarker from './components/MapMarker.vue'

const components = [Map, MapMarker]

const Vue3Map = {
  initMapApiLoader,
  ...components,
  install: (app: App<Element>) => {
    components.map((c) => {
      app.component(c.name, c)
    })
  },
}

export default Vue3Map
