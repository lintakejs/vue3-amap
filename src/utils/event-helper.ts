import { ListenerHash, MapInstance } from '../@types/common'

class EventHelper {
  private listener!: Map<MapInstance, ListenerHash>

  constructor() {
    this.listener = new Map()
  }

  addListener(
    instance: MapInstance,
    eventName: string,
    handler: EventListener
  ) {
    if (!AMap.event) throw new Error('please wait for Map API load')
    const listener = AMap.event.addListener(instance, eventName, handler)
    if (!this.listener.get(instance)) this.listener.set(instance, {})
    const listenerMap = this.listener.get(instance)
    if (listenerMap) {
      if (!listenerMap[eventName]) listenerMap[eventName] = []
      listenerMap[eventName].push(listener)
    }
  }

  addListenerOnce(
    instance: MapInstance,
    eventName: string,
    handler: EventListener,
    context?: any
  ) {
    return AMap.event.addListenerOnce(instance, eventName, handler, context)
  }

  removeListener(
    instance: MapInstance,
    eventName: string,
    handler?: EventListener
  ) {
    if (!AMap.event) throw new Error('please wait for Map API load')
    const listener = this.listener.get(instance)
    if (!listener || !listener[eventName]) return
    const listenerArr = listener[eventName]
    if (handler) {
      const l_index = listenerArr.indexOf(handler)
      AMap.event.removeListener(listenerArr[l_index])
      listenerArr.splice(l_index, 1)
    } else {
      listenerArr.forEach((listener) => {
        AMap.event.removeListener(listener)
      })
      listener[eventName] = []
    }
  }

  clearListeners(instance: MapInstance) {
    const listeners = this.listener.get(instance)
    if (!listeners) return
    Object.keys(listeners).map((eventName) => {
      this.removeListener(instance, eventName)
    })
  }
}

export const eventHelper = new EventHelper()
