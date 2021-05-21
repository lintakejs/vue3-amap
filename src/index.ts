import { App } from 'vue'
import { initMapApiLoader } from './services/injected-map-api'
// 组件
import Map from './components/Map.vue'
import MapMarker from './components/MapMarker.vue'
import MapPolyline from './components/MapPolyline.vue'
import MapPolygon from './components/MapPolygon.vue'
import MapCircle from './components/MapCircle.vue'

const components = [Map, MapMarker, MapPolyline, MapPolygon, MapCircle]

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
