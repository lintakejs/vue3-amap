import type { App } from 'vue'
import VMap from '@vue3-amap/v-map'
import VMapCirCle from '@vue3-amap/v-map-circle'
import VMapMarker from '@vue3-amap/v-map-marker'
import VMapPolygon from '@vue3-amap/v-map-polygon'
import VMapPolyline from '@vue3-amap/v-map-polyline'
import VMapText from '@vue3-amap/v-map-text'
import { initMapApiLoader } from '@vue3-amap/services/injected-map-api'

const components = [
  VMap,
  VMapCirCle,
  VMapMarker,
  VMapPolygon,
  VMapPolyline,
  VMapText,
]

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export {
  VMap,
  VMapCirCle,
  VMapMarker,
  VMapPolygon,
  VMapPolyline,
  VMapText,
  install,
  initMapApiLoader,
}

export default {
  install,
  initMapApiLoader,
}
