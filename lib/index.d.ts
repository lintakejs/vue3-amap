import type { App } from 'vue';
import VMap from './v-map';
import VMapCirCle from './v-map-circle';
import VMapMarker from './v-map-marker';
import VMapPolygon from './v-map-polygon';
import VMapPolyline from './v-map-polyline';
import VMapText from './v-map-text';
import { initMapApiLoader } from './services/injected-map-api';
declare const install: (app: App) => void;
export { VMap, VMapCirCle, VMapMarker, VMapPolygon, VMapPolyline, VMapText, install, initMapApiLoader, };
declare const _default: {
    install: (app: App<any>) => void;
    initMapApiLoader: (config: MapConfig) => void;
};
export default _default;
