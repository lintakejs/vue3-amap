import type { App } from 'vue'
import VMap from '@vue3-amap/vmap'
import VMapCirCle from '@vue3-amap/vmap-circle'
import VMapMarker from '@vue3-amap/vmap-marker'
import VMapPolygon from '@vue3-amap/vmap-polygon'
import VMapPolyline from '@vue3-amap/vmap-polyline'
import VMapText from '@vue3-amap/vmap-text'
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
