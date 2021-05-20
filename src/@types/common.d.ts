import { commonConvertMap } from '../utils/cover-helper'

export type Protocol = 'https' | 'http'

export type MapInstance =
  | AMap.Map
  | AMap.Marker
  | AMap.MarkerShape
  | AMap.Icon
  | AMap.Polyline
  | AMap.Polygon

export type MapEditor =
  | AMap.PolylineEditor
  | AMap.PolygonEditor
  | AMap.CoreEditor

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

type ConverterKey = keyof typeof commonConvertMap
type ConverterFn =
  | ReturnType<typeof commonConvertMap[ConverterKey]>
  | MapInstance

export type Converters<T extends Record<string, any>> = {
  [key in keyof T]: (...args: any[]) => ConverterFn
}

export type Handlers<T extends Record<string, any>> = {
  [key in keyof T]: (...args: any[]) => void
}
