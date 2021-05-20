import {
  inject,
  onMounted,
  onUnmounted,
  provide,
  shallowRef,
  WatchStopHandle,
} from 'vue'
import { Converters, Handlers, MapInstance } from '../@types/common'
import { AmapPromise } from '../config/symbolVariable'
import { convertProps } from './coverProps'
import { setPropWatchers, unInstallWatchFns, unregisterEvents } from './'

export function useRegisterComponent<
  T extends MapInstance,
  D extends Record<string, any>,
  F extends Record<string, any>
>(
  props: Record<string, any>,
  amapInitCb: (
    amapInstance: AMap.Map,
    coverProps: Record<string, any>
  ) => T | Promise<T>,
  transferredProps?: {
    converters?: Converters<D>
    handlers?: Handlers<F>
  },
  amapPromise?: Promise<AMap.Map>
) {
  const amapInstance = shallowRef<AMap.Map | null>(null)
  const amapComponent = shallowRef<T | null>(null)
  const coverPropsUnWatch = shallowRef<WatchStopHandle[]>([])

  let getAmapInstancePromise!: Promise<AMap.Map>

  if (amapPromise) {
    getAmapInstancePromise = amapPromise
    provide(AmapPromise, amapPromise)
  } else {
    getAmapInstancePromise = inject<Promise<AMap.Map>>(
      AmapPromise
    ) as Promise<AMap.Map>
  }

  onMounted(async () => {
    const amapObj = await getAmapInstancePromise
    amapInstance.value = amapObj
    const amapComponentInit = amapInitCb(
      amapInstance.value,
      convertProps(props, transferredProps ? transferredProps.converters : {})
    )
    if (amapComponentInit instanceof Promise) {
      const comInstance = await amapComponentInit
      amapComponent.value = comInstance
    } else {
      amapComponent.value = amapComponentInit
    }

    const { unwatchFns } = setPropWatchers(
      props,
      amapComponent.value,
      transferredProps ? transferredProps.handlers : {},
      transferredProps ? transferredProps.converters : {}
    )
    coverPropsUnWatch.value = unwatchFns
  })

  onUnmounted(() => {
    if (amapComponent.value) {
      unregisterEvents(amapComponent.value)
      coverPropsUnWatch.value = unInstallWatchFns(coverPropsUnWatch.value)
    }

    amapInstance.value?.destroy()
  })

  return {
    amapInstance,
    getAmapInstancePromise,
    amapComponent,
  }
}
