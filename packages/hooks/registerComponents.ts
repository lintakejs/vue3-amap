import { Converters, Handlers } from '@vue3-amap/hooks/type'
import { AmapPromise } from '@vue3-amap/config/symbolVariable'
import {
  watch,
  inject,
  // onMounted,
  onUnmounted,
  provide,
  shallowRef,
  WatchStopHandle,
} from 'vue'
import { convertProps } from '@vue3-amap/hooks/coverProps'
import { unregisterEvents } from '@vue3-amap/hooks/rigisterEvents'
import { setPropWatchers } from '@vue3-amap/hooks/setPropWatchers'

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
  getAmapPromise?: () => Promise<AMap.Map>,
) {
  const amapInstance = shallowRef<AMap.Map | null>(null)
  const amapComponent = shallowRef<T | null>(null)
  const editor = shallowRef<E | undefined>(undefined)
  const coverPropsUnWatch = shallowRef<WatchStopHandle[]>([])

  let getAmapInstancePromise = shallowRef<Promise<AMap.Map>>()
  if (Object.prototype.toString.call(getAmapPromise) === '[object Function]') {
    getAmapInstancePromise.value = getAmapPromise()
    provide(AmapPromise, getAmapInstancePromise)
  } else {
    getAmapInstancePromise = inject<typeof getAmapInstancePromise>(
      AmapPromise,
    )
  }

  const amapInstanceWatcher = watch(() => getAmapInstancePromise.value, newAmapInstancePromise => {
    newAmapInstancePromise.then(() => {
      unAmapObj()
      initAmapObj()
    })
  }, { immediate: true })

  function reloadAmapInstancePromise(reloadPromise: () => Promise<AMap.Map>) {
    getAmapInstancePromise.value = reloadPromise()
    getAmapInstancePromise.value.then(() => {
      unAmapObj()
      initAmapObj()
    })
  }

  async function initAmapObj() {
    const amapObj = await getAmapInstancePromise.value
    amapInstance.value = amapObj
    const converterProps = convertProps(props, transferredProps?.converters)
    const amapComponentInit = initFn.amapInitCb(
      amapInstance.value,
      converterProps,
    )
    if (Object.prototype.toString.call(amapComponentInit) === '[object Promise]') {
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
  }

  function unAmapObj() {
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
    coverPropsUnWatch.value.forEach(unwatch => unwatch())
  }

  onUnmounted(() => {
    unAmapObj()
    amapInstanceWatcher()
  })

  return {
    amapComponent,
    editor,
    reloadAmapInstancePromise,
  }
}
