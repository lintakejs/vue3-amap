export declare function toPixel(arr: number[]): AMap.Pixel;
export declare function toSize(arr: number[]): AMap.Size;
export declare function pixelTo(pixel: AMap.Pixel | AMap.Pixel[]): number[] | AMap.Pixel[];
export declare function toLngLat(arr: number[]): AMap.LngLat;
export declare function lngLatTo(lngLat: AMap.LngLat | AMap.LngLat[]): number[] | AMap.LngLat[];
export declare function toBounds(arrs: number[][]): AMap.Bounds;
export declare const commonConvertMap: {
    position: typeof toLngLat;
    offset: typeof toPixel;
    bounds: typeof toBounds;
    LngLat: typeof toLngLat;
    Pixel: typeof toPixel;
    Size: typeof toSize;
    Bounds: typeof toBounds;
};
