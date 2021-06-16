import type { App } from 'vue'
import VMap from '@vue3-amap/vmap'

const components = [
  VMap,
]

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export {
  VMap,
  install,
}

export default {
  install,
}
