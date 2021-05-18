export type Protocol = 'https' | 'http'

export type MapInstance = AMap.Map | AMap.Marker

export interface MapConfig {
  key: string
  v: string
  protocol?: string
  hostAndPath?: string
  plugin?: string[]
  callback?: string
}

export interface ListenerHash {
  [key: string]: Array<EventListener>
}

export interface AmapComponentProp {
  [key: string]: any
  events?: {
    [key: string]: EventListener
  }
  onceEvents?: {
    [key: string]: EventListener
  }
}
