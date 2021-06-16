import { Converters } from './type';
export declare function useRegisterComponent<T extends MapInstance, D extends Record<string, any>, F extends Record<string, any>, E extends MapEditor>(props: Record<string, any>, initFn: {
    amapInitCb: (amapInstance: AMap.Map, coverProps: Record<string, any>) => T | Promise<T>;
    editorInit?: (amapInstance: AMap.Map, amapComponent: T, coverProps: Record<string, any>) => E | undefined;
}, transferredProps?: {
    converters?: Converters<D>;
    handlers?: Handlers<F>;
}, amapPromise?: Promise<AMap.Map>): {
    amapComponent: T extends import("vue").Ref<any> ? T : import("vue").Ref<T>;
    editor: E extends import("vue").Ref<any> ? E : import("vue").Ref<E>;
};
