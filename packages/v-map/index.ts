import { App } from 'vue'
import { SFCWithInstall } from '@vue3-amap/utils/type'
import VMap from './src/index.vue'
import { initMapApiLoader } from '@vue3-amap/services/injected-map-api'

VMap.install = (app: App): void => {
  app.component(VMap.name, VMap)
}

const _VMap: SFCWithInstall<typeof VMap> = VMap

export default _VMap

export {
  initMapApiLoader,
}
