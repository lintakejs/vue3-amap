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
    const handleProp = prop
    const handleFun = getHandlerFun(handleProp, amapInstance, handlers)
    if (!handleFun && prop !== 'events') return

    const unWatch = watch(
      () => propsData[prop],
      (nv) => {
        if (prop === 'events') {
          unregisterEvents(amapInstance)
          registerEvents(amapInstance, propsData)
          return
        }

        if (handleFun && handleFun === (amapInstance as any).setOptions) {
          return handleFun.call(amapInstance, {
            [handleProp]: convertSignalProp(prop, nv, converters),
          })
        }

        handleFun.call(amapInstance, convertSignalProp(prop, nv, converters))
      }
    )

    unwatchFns.push(unWatch)
  })

  return {
    unwatchFns,
  }
}
