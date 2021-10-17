import MapApiLoader from './lazy-map-loader';
var lazyMapApiLoaderInstance = null;
export var initMapApiLoader = function initMapApiLoader(config) {
  if (lazyMapApiLoaderInstance) {
    throw new Error('You has already initial map instance, just import it!');
  }

  lazyMapApiLoaderInstance = new MapApiLoader(config);
};
export { lazyMapApiLoaderInstance };