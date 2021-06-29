import type { App } from 'vue'
import VMap from '@vue3-amap/vmap'
// import VMapCirCle from '@vue3-amap/vmap-circle'

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
