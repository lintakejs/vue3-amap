import { MapInstance } from '../@types/common'
import { eventHelper } from '../utils/event-helper'

export function registerEvents(
  amapInstance: MapInstance,
  props: Record<string, any>
) {
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

export function unregisterEvents(amapInstance: MapInstance) {
  eventHelper.clearListeners(amapInstance)
}
