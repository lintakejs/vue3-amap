import { Converters, Handlers } from './type'
import { AmapPromise } from '@vue3-amap/config/symbolVariable'
import {
  inject,
  onMounted,
  onUnmounted,
  provide,
  shallowRef,
  WatchStopHandle,
} from 'vue'
import { convertProps } from './coverProps'
import { unregisterEvents } from './rigisterEvents'
import { setPropWatchers } from './setPropWatchers'

export function useRegisterComponent<
  T extends MapInstance,
  D extends Record<string, unknown>,
  E extends MapEditor = MapEditor
>(
  props: D,
  initFn: {
    amapInitCb: (amapInstance: AMap.Map, coverProps: D) => T | Promise<T>
    editorInit?: (
      amapInstance: AMap.Map,
      amapComponent: T,
      coverProps: D
    ) => E | undefined
  },
  transferredProps?: {
    converters?: Converters<D>
    handlers?: Handlers<D>
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
    const converterProps = convertProps(props, transferredProps?.converters)
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

    const { unwatchFns } = setPropWatchers(
      props,
      amapComponent.value,
      transferredProps?.handlers,
      transferredProps?.converters,
      {
        edit: editor,
        editInit: () => {
          return initFn.editorInit(
            amapInstance.value,
            amapComponent.value as T,
            converterProps,
          )
        },
      },
    )
    coverPropsUnWatch.value = unwatchFns
  })

  onUnmounted(() => {
    const componentInstance = amapComponent.value
    const editorInstance = editor.value

    if (componentInstance) {
      unregisterEvents(componentInstance)
      if ('setMap' in componentInstance) {
        componentInstance.setMap(null)
      }
      if ('close' in componentInstance) {
        componentInstance.close()
      }
      unregisterEvents(editorInstance)
      editorInstance && editorInstance.close()
    }
  })

  return {
    amapComponent,
    editor,
  }
}
