import { MapInstance } from '../@types/common'

export function registerEvents(
  amapInstance: MapInstance,
  props: Record<string, any>
) {
  if (
    !(amapInstance instanceof AMap.Map) &&
    !(amapInstance instanceof AMap.Marker)
  ) {
    return
  }
  if (props.events) {
    for (const eventName in props.events) {
      amapInstance.on(eventName, props.events[eventName])
    }
  }
  if (props.onceEvents) {
    for (const eventName in props.onceEvents) {
      amapInstance.on(eventName, props.onceEvents[eventName], null, true)
    }
  }
}

export function unregisterEvents(amapInstance: MapInstance) {
  if (
    !(amapInstance instanceof AMap.Map) &&
    !(amapInstance instanceof AMap.Marker)
  ) {
    return
  }
  amapInstance.clearEvents('')
}
