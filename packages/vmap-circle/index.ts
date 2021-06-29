import { App } from 'vue'
import { SFCWithInstall } from '../utils/type'
import VMapCirCle from './src/index.vue'

VMapCirCle.install = (app: App): void => {
  app.component(VMapCirCle.name, VMapCirCle)
}

const _VMap: SFCWithInstall<typeof VMapCirCle> = VMapCirCle

export default _VMap
