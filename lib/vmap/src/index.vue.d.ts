import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    center: {
        type: PropType<number[]>;
        default: () => any[];
    };
    zoom: {
        type: NumberConstructor;
        default: number;
    };
    rotation: {
        type: NumberConstructor;
        default: number;
    };
    pitch: {
        type: NumberConstructor;
        default: number;
    };
    viewMode: {
        type: PropType<"2D" | "3D">;
        default: string;
    };
    features: {
        type: PropType<string[]>;
        default: () => any[];
    };
    layers: {
        type: PropType<AMap.TileLayer[]>;
        default: () => any[];
    };
    zooms: {
        type: PropType<number[]>;
        default: () => any[];
    };
    dragEnable: {
        type: BooleanConstructor;
        default: boolean;
    };
    zoomEnable: {
        type: BooleanConstructor;
        default: boolean;
    };
    jogEnable: {
        type: BooleanConstructor;
        default: boolean;
    };
    pitchEnable: {
        type: BooleanConstructor;
        default: boolean;
    };
    rotateEnable: {
        type: BooleanConstructor;
        default: boolean;
    };
    animateEnable: {
        type: BooleanConstructor;
        default: boolean;
    };
    keyboardEnable: {
        type: BooleanConstructor;
        default: boolean;
    };
    doubleClickZoom: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollWheel: {
        type: BooleanConstructor;
        default: boolean;
    };
    touchZoom: {
        type: BooleanConstructor;
        default: boolean;
    };
    touchZoomCenter: {
        type: NumberConstructor;
        default: number;
    };
    showLabel: {
        type: BooleanConstructor;
        default: boolean;
    };
    defaultCursor: {
        type: StringConstructor;
    };
    isHotspot: {
        type: BooleanConstructor;
    };
    mapStyle: {
        type: StringConstructor;
    };
    wallColor: {
        type: PropType<string | number[]>;
    };
    roofColor: {
        type: PropType<string | number[]>;
    };
    showBuildingBlock: {
        type: BooleanConstructor;
        default: boolean;
    };
    showIndoorMap: {
        type: BooleanConstructor;
        default: boolean;
    };
    skyColor: {
        type: PropType<string | number[]>;
    };
    labelRejectMask: {
        type: BooleanConstructor;
        default: boolean;
    };
    mask: {
        type: PropType<number[]>;
    };
    plugins: {
        type: ArrayConstructor;
    };
    events: {
        type: ArrayConstructor;
    };
    onceEvents: {
        type: ArrayConstructor;
    };
}, {
    mapUid: string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    center: number[];
    zoom: number;
    rotation: number;
    pitch: number;
    viewMode: "2D" | "3D";
    features: string[];
    layers: AMap.TileLayer[];
    zooms: number[];
    dragEnable: boolean;
    zoomEnable: boolean;
    jogEnable: boolean;
    pitchEnable: boolean;
    rotateEnable: boolean;
    animateEnable: boolean;
    keyboardEnable: boolean;
    doubleClickZoom: boolean;
    scrollWheel: boolean;
    touchZoom: boolean;
    touchZoomCenter: number;
    showLabel: boolean;
    isHotspot: boolean;
    showBuildingBlock: boolean;
    showIndoorMap: boolean;
    labelRejectMask: boolean;
} & {
    defaultCursor?: string;
    mapStyle?: string;
    wallColor?: string | number[];
    roofColor?: string | number[];
    skyColor?: string | number[];
    mask?: number[];
    plugins?: unknown[];
    events?: unknown[];
    onceEvents?: unknown[];
}>, {
    center: number[];
    zoom: number;
    rotation: number;
    pitch: number;
    viewMode: "2D" | "3D";
    features: string[];
    layers: AMap.TileLayer[];
    zooms: number[];
    dragEnable: boolean;
    zoomEnable: boolean;
    jogEnable: boolean;
    pitchEnable: boolean;
    rotateEnable: boolean;
    animateEnable: boolean;
    keyboardEnable: boolean;
    doubleClickZoom: boolean;
    scrollWheel: boolean;
    touchZoom: boolean;
    touchZoomCenter: number;
    showLabel: boolean;
    isHotspot: boolean;
    showBuildingBlock: boolean;
    showIndoorMap: boolean;
    labelRejectMask: boolean;
}>;
export default _default;
