import type { App } from 'vue';
import VMap from '@vue3-amap/v-map';
import VMapCirCle from '@vue3-amap/v-map-circle';
import VMapMarker from '@vue3-amap/v-map-marker';
import VMapPolygon from '@vue3-amap/v-map-polygon';
import VMapPolyline from '@vue3-amap/v-map-polyline';
import VMapText from '@vue3-amap/v-map-text';
import { initMapApiLoader } from '@vue3-amap/services/injected-map-api';
declare const install: (app: App) => void;
export { VMap, VMapCirCle, VMapMarker, VMapPolygon, VMapPolyline, VMapText, install, initMapApiLoader, };
declare const _default: {
    install: (app: App<any>) => void;
    initMapApiLoader: (config: MapConfig) => void;
};
export default _default;
