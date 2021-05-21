import { watch, WatchStopHandle } from 'vue'
import upperCamelCase from 'uppercamelcase'
import { Converters, Handlers, MapInstance } from '../@types/common'
import { unregisterEvents, registerEvents, convertSignalProp } from './'

function getHandlerFun<T extends Record<string, any>>(
  prop: string,
  amapInstance: any,
  handlers?: Handlers<T>
) {
  if (handlers && handlers[prop]) {
    return handlers[prop]
  }

  return amapInstance[`set${upperCamelCase(prop)}`] || amapInstance.setOptions
}

export function propWatchFn<T extends Record<string, any>>(
  propsData: T,
  key: string,
  amapInstance: MapInstance,
  handleFun: Function,
  converters?: Converters<T>
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

  handleFun.call(
    amapInstance,
    convertSignalProp(key, propsData[key], converters)
  )
}

export function unInstallWatchFns(unwatchFns: WatchStopHandle[]) {
  unwatchFns.forEach((unwatch) => unwatch())
  return []
}

export function setPropWatchers<T extends Record<string, any>>(
  propsData: T,
  amapInstance: MapInstance,
  handlers?: Handlers<T>,
  converters?: Converters<T>
) {
  const unwatchFns = [] as WatchStopHandle[]
  Object.keys(propsData).forEach((prop) => {
    const handleFun = getHandlerFun(prop, amapInstance, handlers)
    if (!handleFun && prop !== 'events') return
    propWatchFn(propsData, prop, amapInstance, handleFun, converters)
    const unWatch = watch(
      () => propsData[prop],
      () => {
        propWatchFn(propsData, prop, amapInstance, handleFun, converters)
      }
    )

    unwatchFns.push(unWatch)
  })

  return {
    unwatchFns,
  }
}
