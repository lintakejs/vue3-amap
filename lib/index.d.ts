import type { App } from 'vue';
import VMap from './vmap';
import VMapCirCle from './vmap-circle';
import VMapMarker from './vmap-marker';
import VMapPolygon from './vmap-polygon';
import VMapPolyline from './vmap-polyline';
import VMapText from './vmap-text';
import { initMapApiLoader } from './services/injected-map-api';
declare const install: (app: App) => void;
export { VMap, VMapCirCle, VMapMarker, VMapPolygon, VMapPolyline, VMapText, install, initMapApiLoader, };
declare const _default: {
    install: (app: App<any>) => void;
    initMapApiLoader: (config: MapConfig) => void;
};
export default _default;
