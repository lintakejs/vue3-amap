import { App } from 'vue'
import { SFCWithInstall } from '@vue3-amap/utils/type'
import VMapMarker from './src/index.vue'

VMapMarker.install = (app: App): void => {
  app.component(VMapMarker.name, VMapMarker)
}

const _VMap: SFCWithInstall<typeof VMapMarker> = VMapMarker

export default _VMap
