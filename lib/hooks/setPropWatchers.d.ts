import { WatchStopHandle } from 'vue';
import { Converters } from './type';
export declare function propWatchFn<T extends Record<string, any>>(propsData: T, key: string, amapInstance: MapInstance, handleFun: Function, converters?: Converters<T>): any;
export declare function unInstallWatchFns(unwatchFns: WatchStopHandle[]): any[];
export declare function setPropWatchers<T extends Record<string, any>>(propsData: T, amapInstance: MapInstance, handlers?: Handlers<T>, converters?: Converters<T>): {
    unwatchFns: WatchStopHandle[];
};
