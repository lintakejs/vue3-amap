export function registerEvents(amapInstance: any, props: Record<string, any>) {
  if (props.events) {
    for (const eventName in props.events) {
      amapInstance.on && amapInstance.on(eventName, props.events[eventName])
    }
  }
  if (props.onceEvents) {
    for (const eventName in props.onceEvents) {
      amapInstance.on &&
        amapInstance.on(eventName, props.onceEvents[eventName], null, true)
    }
  }
}

export function unregisterEvents(amapInstance: any) {
  amapInstance.clearEvents && amapInstance.clearEvents('')
}
