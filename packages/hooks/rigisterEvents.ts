export function registerEvents(amapInstance: any, props: Record<string, any>, eventKeys: string[]) {
  if (!amapInstance) {
    return
  }
  eventKeys.map(key => {
    if (props[key]) {
      for (const eventName in props[key]) {
        if (key.includes('once')) {
          amapInstance.on &&
            amapInstance.on(eventName, props[key][eventName], null, true)
        } else {
          amapInstance.on && amapInstance.on(eventName, props[key][eventName])
        }
      }
    }
  })
}

export function unregisterEvents(amapInstance: any) {
  if (!amapInstance) {
    return
  }
  amapInstance.clearEvents && amapInstance.clearEvents('')
}
