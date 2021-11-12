import { Converters } from '@vue3-amap/hooks/type'

export function convertSignalProp<T = Record<string, any>>(
  key: keyof T,
  sourceData: any,
  converter?: Converters<Partial<T>>,
) {
  if (converter && converter[key]) {
    return converter[key](sourceData)
  } else {
    return sourceData
  }
}
/**
 * @description 由于地图部分options需要Amap的实例化数据，需要基于用户props来改造赋值
 * @param propsData 组件props
 * @param converters 地图实例重新赋值为地图数据实例的参数
 * @returns 地图options
 */
export function convertProps<T = Record<string, any>>(
  propsData: T,
  converters?: Converters<Partial<T>>,
) {
  const cvProps: T = {} as T

  return Object.keys(propsData).reduce((res, _key) => {
    const key = _key as keyof T
    const propsValue = convertSignalProp(key, propsData[key], converters)
    if (propsValue === undefined) {
      return res
    }
    cvProps[key] = propsValue
    return res
  }, cvProps)
}
