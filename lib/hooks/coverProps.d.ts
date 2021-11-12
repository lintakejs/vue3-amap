import { Converters } from '@vue3-amap/hooks/type';
export declare function convertSignalProp<T = Record<string, any>>(key: keyof T, sourceData: any, converter?: Converters<Partial<T>>): any;
export declare function convertProps<T = Record<string, any>>(propsData: T, converters?: Converters<Partial<T>>): T;
