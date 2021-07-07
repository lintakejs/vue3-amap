import { SFCWithInstall } from '../utils/type';
import VMap from './src/index.vue';
import { initMapApiLoader } from '../services/injected-map-api';
declare const _VMap: SFCWithInstall<typeof VMap>;
export default _VMap;
export { initMapApiLoader, };
