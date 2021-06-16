import { commonConvertMap } from '@/packages/utils/cover-helper';
export declare type ConverterKey = keyof typeof commonConvertMap;
export declare type ConverterFn = ReturnType<typeof commonConvertMap[ConverterKey]> | MapInstance;
export declare type Converters<T extends Record<string, any>> = {
    [key in keyof T]: (...args: any[]) => ConverterFn;
};
export declare type Handlers<T extends Record<string, any>> = {
    [key in keyof T]: (...args: any[]) => void;
};
