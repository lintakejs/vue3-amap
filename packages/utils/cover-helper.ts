export function toPixel(arr: number[]) {
  return new AMap.Pixel(arr[0], arr[1])
}

export function toSize(arr: number[]) {
  return new AMap.Size(arr[0], arr[1])
}

export function pixelTo(pixel: AMap.Pixel | AMap.Pixel[]) {
  if (Array.isArray(pixel)) return pixel
  return [pixel.getX(), pixel.getY()]
}

export function toLngLat(arr: number[]) {
  return new AMap.LngLat(arr[0], arr[1])
}

export function lngLatTo(lngLat: AMap.LngLat | AMap.LngLat[]) {
  if (!lngLat) return
  if (Array.isArray(lngLat)) return lngLat.slice()
  return [lngLat.getLng(), lngLat.getLat()]
}

/**
 * @param arrs 二重数组 southWest, northEast
 */
export function toBounds(arrs: number[][]) {
  return new AMap.Bounds(toLngLat(arrs[0]), toLngLat(arrs[1]))
}

export const commonConvertMap = {
  position: toLngLat,
  offset: toPixel,
  bounds: toBounds,
  LngLat: toLngLat,
  Pixel: toPixel,
  Size: toSize,
  Bounds: toBounds,
}
