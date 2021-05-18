import {
  inject,
  onMounted,
  onUnmounted,
  provide,
  shallowRef,
  watch,
} from '@vue/runtime-core'
import { AmapComponentProp, MapInstance } from '../@types/common'
import { AmapPromise } from '../config/symbolVariable'
import { eventHelper } from '../utils/event-helper'

function registerEvents(amapInstance: MapInstance, props: AmapComponentProp) {
  if (props.events) {
    for (const eventName in props.events) {
      eventHelper.addListener(amapInstance, eventName, props.events[eventName])
    }
  }
  if (props.onceEvents) {
    for (const eventName in props.onceEvents) {
      eventHelper.addListenerOnce(
        amapInstance,
        eventName,
        props.onceEvents[eventName]
      )
    }
  }
}

function unregisterEvents(amapInstance: MapInstance) {
  eventHelper.clearListeners(amapInstance)
}

export function useRegisterComponent(
  props: AmapComponentProp,
  amapPromise?: Promise<AMap.Map>
) {
  const amapInstance = shallowRef<AMap.Map | null>(null)

  let getAmapInstancePromise!: Promise<AMap.Map>

  if (amapPromise) {
    getAmapInstancePromise = amapPromise
    provide(AmapPromise, amapPromise)
  } else {
    getAmapInstancePromise = inject<Promise<AMap.Map>>(
      AmapPromise
    ) as Promise<AMap.Map>
  }

  watch(
    () => props.events,
    (npEvents) => {
      if (amapInstance.value) {
        unregisterEvents(amapInstance.value)
        if (npEvents) {
          registerEvents(amapInstance.value, props)
        }
      }
    }
  )

  onMounted(() => {
    getAmapInstancePromise.then((amapObj) => {
      amapInstance.value = amapObj
      registerEvents(amapInstance.value, props)
    })
  })

  onUnmounted(() => {
    if (amapInstance.value) {
      eventHelper.clearListeners(amapInstance.value)
      amapInstance.value.destroy()
    }
  })

  return {
    amapInstance,
    getAmapInstancePromise,
  }
}
