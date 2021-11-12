import MapApiLoader from '@vue3-amap/services/lazy-map-loader';
var lazyMapApiLoaderInstance = null;
export var initMapApiLoader = function initMapApiLoader(config) {
  if (lazyMapApiLoaderInstance) {
    console.warn('You has already initial map instance, just import it!');
  }

  lazyMapApiLoaderInstance = new MapApiLoader(config);
};
export { lazyMapApiLoaderInstance };