import { App } from 'vue'
import { SFCWithInstall } from '../utils/type'
import vMapPolyline from './src/index.vue'

vMapPolyline.install = (app: App): void => {
  app.component(vMapPolyline.name, vMapPolyline)
}

const _VMap: SFCWithInstall<typeof vMapPolyline> = vMapPolyline

export default _VMap
