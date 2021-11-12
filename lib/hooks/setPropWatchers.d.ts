import { Ref, WatchStopHandle } from 'vue';
import { Converters, Handlers } from '@vue3-amap/hooks/type';
export declare function propWatchFn<T = Record<string, any>, E = MapEditor>(propsData: T, key: string, amapInstance: MapInstance, handleFun: Function, converters?: Converters<T>, editInfo?: {
    edit: Ref<E | null>;
    editInit: (...args: any[]) => E;
}): any;
export declare function unInstallWatchFns(unwatchFns: WatchStopHandle[]): any[];
export declare function setPropWatchers<T = Record<string, any>, E = MapEditor>(propsData: T, amapInstance: MapInstance, handlers?: Handlers<T>, converters?: Converters<T>, editInfo?: {
    edit: Ref<E | null>;
    editInit: (...args: any[]) => E;
}): {
    unwatchFns: WatchStopHandle[];
};
