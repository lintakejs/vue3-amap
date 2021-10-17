import { Converters, Handlers } from './type';
export declare function useRegisterComponent<T extends MapInstance, D extends Record<string, unknown>, E extends MapEditor = MapEditor>(props: D, initFn: {
    amapInitCb: (amapInstance: AMap.Map, coverProps: D) => T | Promise<T>;
    editorInit?: (amapInstance: AMap.Map, amapComponent: T, coverProps: D) => E | undefined;
}, transferredProps?: {
    converters?: Converters<D>;
    handlers?: Handlers<D>;
}, getAmapPromise?: () => Promise<AMap.Map>): {
    amapComponent: T extends import("vue").Ref<any> ? T : import("vue").Ref<T>;
    editor: E extends import("vue").Ref<any> ? E : import("vue").Ref<E>;
    reloadAmapInstancePromise: (reloadPromise: () => Promise<AMap.Map>) => void;
};
