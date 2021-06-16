import {
  inject,
  onMounted,
  onUnmounted,
  provide,
  shallowRef,
  WatchStopHandle,
} from 'vue'
import { Converters } from './type'
import { AmapPromise } from '../config/symbolVariable'
import { convertProps } from './coverProps'
import { setPropWatchers, unInstallWatchFns } from './setPropWatchers'
import { unregisterEvents } from './rigisterEvents'

export function useRegisterComponent<
  T extends MapInstance,
  D extends Record<string, any>,
  F extends Record<string, any>,
  E extends MapEditor
>(
  props: Record<string, any>,
  initFn: {
    amapInitCb: (
      amapInstance: AMap.Map,
      coverProps: Record<string, any>
    ) => T | Promise<T>
    editorInit?: (
      amapInstance: AMap.Map,
      amapComponent: T,
      coverProps: Record<string, any>
    ) => E | undefined
  },
  transferredProps?: {
    converters?: Converters<D>
    handlers?: Handlers<F>
  },
  amapPromise?: Promise<AMap.Map>,
) {
  const amapInstance = shallowRef<AMap.Map | null>(null)
  const amapComponent = shallowRef<T | null>(null)
  const editor = shallowRef<E | undefined>(undefined)
  const coverPropsUnWatch = shallowRef<WatchStopHandle[]>([])

  let getAmapInstancePromise!: Promise<AMap.Map>

  if (amapPromise) {
    getAmapInstancePromise = amapPromise
    provide(AmapPromise, amapPromise)
  } else {
    getAmapInstancePromise = inject<Promise<AMap.Map>>(
      AmapPromise,
    ) as Promise<AMap.Map>
  }

  onMounted(async () => {
    const amapObj = await getAmapInstancePromise
    amapInstance.value = amapObj
    const converterProps = convertProps(
      props,
      transferredProps ? transferredProps.converters : {},
    )
    const amapComponentInit = initFn.amapInitCb(
      amapInstance.value,
      converterProps,
    )
    if (amapComponentInit instanceof Promise) {
      const comInstance = await amapComponentInit
      amapComponent.value = comInstance
    } else {
      amapComponent.value = amapComponentInit
    }

    if (initFn.editorInit) {
      editor.value = initFn.editorInit(
        amapInstance.value,
        amapComponent.value as T,
        converterProps,
      )
    }

    const { unwatchFns } = setPropWatchers(
      props,
      amapComponent.value,
      transferredProps ? transferredProps.handlers : {},
      transferredProps ? transferredProps.converters : {},
    )
    coverPropsUnWatch.value = unwatchFns
  })

  onUnmounted(() => {
    const componentInstance = amapComponent.value as any
    const editorInstance = editor.value

    if (componentInstance) {
      unregisterEvents(componentInstance)
      componentInstance.setMap && componentInstance.setMap(null)
      componentInstance.close && componentInstance.close()
      editorInstance && editorInstance.close()

      coverPropsUnWatch.value = unInstallWatchFns(coverPropsUnWatch.value)
    }
  })

  return {
    amapComponent,
    editor,
  }
}
