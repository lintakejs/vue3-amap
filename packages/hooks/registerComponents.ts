// import {
//   inject,
//   onMounted,
//   onUnmounted,
//   provide,
//   shallowRef,
//   WatchStopHandle,
// } from 'vue'
// import { Converters } from './type'
// import { AmapPromise } from '../config/symbolVariable'
// import { convertProps } from './coverProps'
// import { setPropWatchers, unInstallWatchFns } from './setPropWatchers'
// import { unregisterEvents } from './rigisterEvents'

// export function useRegisterComponent<
//   T extends MapInstance,
//   D extends Record<string, any>,
//   F extends Record<string, any>,
//   E extends MapEditor
// >(
//   props: Record<string, any>,
//   initFn: {
//     amapInitCb: (
//       amapInstance: AMap.Map,
//       coverProps: Record<string, any>
//     ) => T | Promise<T>
//     editorInit?: (
//       amapInstance: AMap.Map,
//       amapComponent: T,
//       coverProps: Record<string, any>
//     ) => E | undefined
//   },
//   transferredProps?: {
//     converters?: Converters<D>
//     handlers?: Handlers<F>
//   },
//   amapPromise?: Promise<AMap.Map>,
// ) {
//   const amapInstance = shallowRef<AMap.Map | null>(null)
//   const amapComponent = shallowRef<T | null>(null)
//   const editor = initFn.editorInit ? shallowRef<E | undefined>(undefined) : null
//   const coverPropsUnWatch = shallowRef<WatchStopHandle[]>([])

//   let getAmapInstancePromise!: Promise<AMap.Map>

//   if (amapPromise) {
//     getAmapInstancePromise = amapPromise
//     provide(AmapPromise, amapPromise)
//   } else {
//     getAmapInstancePromise = inject<Promise<AMap.Map>>(
//       AmapPromise,
//     ) as Promise<AMap.Map>
//   }

//   onMounted(async () => {
//     const amapObj = await getAmapInstancePromise
//     amapInstance.value = amapObj
//     const converterProps = convertProps(
//       props,
//       transferredProps ? transferredProps.converters : {},
//     )
//     const amapComponentInit = initFn.amapInitCb(
//       amapInstance.value,
//       converterProps,
//     )
//     if (amapComponentInit instanceof Promise) {
//       const comInstance = await amapComponentInit
//       amapComponent.value = comInstance
//     } else {
//       amapComponent.value = amapComponentInit
//     }

//     const { unwatchFns } = setPropWatchers(
//       props,
//       amapComponent.value,
//       transferredProps ? transferredProps.handlers : {},
//       transferredProps ? transferredProps.converters : {},
//       {
//         edit: editor,
//         editInit: () => {
//           return initFn.editorInit(
//             amapInstance.value,
//             amapComponent.value as T,
//             converterProps,
//           )
//         },
//       },
//     )
//     coverPropsUnWatch.value = unwatchFns
//   })

//   onUnmounted(() => {
//     const componentInstance = amapComponent.value as any
//     const editorInstance = editor.value

//     if (componentInstance) {
//       unregisterEvents(componentInstance)
//       componentInstance.setMap && componentInstance.setMap(null)
//       componentInstance.close && componentInstance.close()
//       editorInstance && editorInstance.close()

//       coverPropsUnWatch.value = unInstallWatchFns(coverPropsUnWatch.value)
//     }
//   })

//   return {
//     amapComponent,
//     editor,
//   }
// }

import { Converters, Handlers } from './type'
import { AmapPromise } from '@/config/symbolVariable'
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

      editorInstance && editorInstance.close()
    }
  })

  return {
    amapComponent,
    editor,
  }
}
