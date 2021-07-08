import { App } from 'vue'
import { SFCWithInstall } from '@vue3-amap/utils/type'
import VMapPolyline from './src/index.vue'

VMapPolyline.install = (app: App): void => {
  app.component(VMapPolyline.name, VMapPolyline)
}

const _VMap: SFCWithInstall<typeof VMapPolyline> = VMapPolyline

export default _VMap
