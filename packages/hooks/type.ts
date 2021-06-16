
import { commonConvertMap } from '@/packages/utils/cover-helper'

export type ConverterKey = keyof typeof commonConvertMap
export type ConverterFn =
  | ReturnType<typeof commonConvertMap[ConverterKey]>
  | MapInstance

export type Converters<T extends Record<string, any>> = {
  [key in keyof T]: (...args: any[]) => ConverterFn
}

export type Handlers<T extends Record<string, any>> = {
  [key in keyof T]: (...args: any[]) => void
}
