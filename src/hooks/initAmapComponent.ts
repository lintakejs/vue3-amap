import { onMounted, shallowRef } from 'vue'
import { MapInstance } from '../@types/common'

export function initAmapComponent(
  amapPromise: Promise<AMap.Map>,
  initFn: (amapInstance: AMap.Map) => MapInstance
) {
  const amapComponent = shallowRef<MapInstance | null>(null)

  onMounted(() => {
    amapPromise.then((amapInstance) => {
      amapComponent.value = initFn(amapInstance)
    })
  })

  return {
    amapComponent,
  }
}
