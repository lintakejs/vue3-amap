declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }
  export default component
}

declare type Protocol = 'https' | 'http'

declare type MapInstance =
  | AMap.Map
  | AMap.Marker
  | AMap.MarkerShape
  | AMap.Icon
  | AMap.Polyline
  | AMap.Polygon
  | AMap.ContextMenu

declare type MapListenerInstance = AMap.Map | AMap.Marker | AMap.Polygon

declare type MapEditor =
  | AMap.PolylineEditor
  | AMap.PolygonEditor
  | AMap.CircleEditor

declare interface MapConfig {
  key: string
  v: string
  protocol?: string
  hostAndPath?: string
  plugin?: string[]
  callback?: string
}

declare interface ListenerHash {
  [key: string]: Array<EventListener>
}

declare interface PluginOptions {
  pName: string
  sName: string
  position?: number[]
  offset?: number[] | AMap.Pixel
  map?: AMap.Map
  events?: Record<string, any>
}

declare interface PluginListener {
  eventName: string
  instance: any
}
