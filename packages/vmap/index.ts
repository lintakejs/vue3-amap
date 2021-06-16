import { App } from 'vue'
import { SFCWithInstall } from '../utils/type'
import VMap from './src/index.vue'

VMap.install = (app: App): void => {
  app.component(VMap.name, VMap)
}

const _VMap: SFCWithInstall<typeof VMap> = VMap

export default _VMap
