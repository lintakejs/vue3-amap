import { App } from 'vue'
import { SFCWithInstall } from '@vue3-amap/utils/type'
import VMapPolygon from './src/index.vue'

VMapPolygon.install = (app: App): void => {
  app.component(VMapPolygon.name, VMapPolygon)
}

const _VMap: SFCWithInstall<typeof VMapPolygon> = VMapPolygon

export default _VMap
