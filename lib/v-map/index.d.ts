import { SFCWithInstall } from '@vue3-amap/utils/type';
import VMap from './src/index.vue';
import { initMapApiLoader } from '@vue3-amap/services/injected-map-api';
declare const _VMap: SFCWithInstall<typeof VMap>;
export default _VMap;
export { initMapApiLoader, };
