import { App } from 'vue'
import { SFCWithInstall } from '../utils/type'
import VMapText from './src/index.vue'

VMapText.install = (app: App): void => {
  app.component(VMapText.name, VMapText)
}

const _VMap: SFCWithInstall<typeof VMapText> = VMapText

export default _VMap
