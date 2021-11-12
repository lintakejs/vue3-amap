import MapApiLoader from '@vue3-amap/services/lazy-map-loader'

let lazyMapApiLoaderInstance: MapApiLoader | null = null

export const initMapApiLoader = function (config: MapConfig) {
  if (lazyMapApiLoaderInstance) {
    throw new Error('You has already initial map instance, just import it!')
  }
  lazyMapApiLoaderInstance = new MapApiLoader(config)
}

export { lazyMapApiLoaderInstance }
