import { Ref, watch, WatchStopHandle } from 'vue'
import upperCamelCase from 'uppercamelcase'
import { Converters, Handlers } from './type'
import { unregisterEvents, registerEvents } from './rigisterEvents'
import { convertSignalProp } from './coverProps'

function getHandlerFun<T extends Record<string, any>>(
  prop: string,
  amapInstance: any,
  handlers?: Handlers<T>,
) {
  if (handlers && handlers[prop]) {
    return handlers[prop]
  }

  return amapInstance[`set${upperCamelCase(prop)}`] || amapInstance.setOptions
}

export function propWatchFn<T = Record<string, any>, E = MapEditor>(
  propsData: T,
  key: string,
  amapInstance: MapInstance,
  handleFun: Function,
  converters?: Converters<T>,
  editInfo?: {
    edit: Ref<E | null>
    editInit: (...args: any[]) => E
  },
) {
  if (key === 'events') {
    unregisterEvents(amapInstance)
    registerEvents(amapInstance, propsData)
    return
  }
  if (handleFun && handleFun === (amapInstance as any).setOptions) {
    return handleFun.call(amapInstance, {
      [key]: convertSignalProp(key, propsData[key], converters),
    })
  }

  if (key === 'editable') {
    const editCoverPorpsData = convertSignalProp(key, propsData[key], converters)
    if (editCoverPorpsData instanceof Boolean && editCoverPorpsData === true && editInfo.edit.value === null) {
      editInfo.edit.value = editInfo.editInit()
    }
  }

  handleFun.call(
    amapInstance,
    convertSignalProp(key, propsData[key], converters),
  )
}

export function unInstallWatchFns(unwatchFns: WatchStopHandle[]) {
  unwatchFns.forEach(unwatch => unwatch())
  return []
}

export function setPropWatchers<T = Record<string, any>, E = MapEditor>(
  propsData: T,
  amapInstance: MapInstance,
  handlers?: Handlers<T>,
  converters?: Converters<T>,
  editInfo?: {
    edit: Ref<E | null>
    editInit: (...args: any[]) => E
  },
) {
  const unwatchFns = [] as WatchStopHandle[]
  Object.keys(propsData).forEach(prop => {
    const handleFun = getHandlerFun(prop, amapInstance, handlers)
    if (!handleFun && prop !== 'events') return
    propWatchFn(propsData, prop, amapInstance, handleFun, converters, editInfo)
    const unWatch = watch(
      () => propsData[prop],
      () => {
        propWatchFn(propsData, prop, amapInstance, handleFun, converters, editInfo)
      },
    )

    unwatchFns.push(unWatch)
  })

  return {
    unwatchFns,
  }
}
