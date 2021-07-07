import { commonConvertMap } from '@/utils/cover-helper';
export declare type ConverterKey = keyof typeof commonConvertMap;
export declare type ConverterFn = ReturnType<typeof commonConvertMap[ConverterKey]> | MapInstance;
export declare type Converters<T extends Record<string, any>> = {
    [key in keyof T]?: (val: T[key]) => ConverterFn;
};
export declare type Handlers<T extends Record<string, any>> = {
    [key in keyof T]?: (val: T[key]) => void;
};
