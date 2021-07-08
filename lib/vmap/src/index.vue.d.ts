import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    center: {
        type: PropType<number[]>;
        default: any;
    };
    zoom: {
        type: NumberConstructor;
        default: any;
    };
    rotation: {
        type: NumberConstructor;
        default: any;
    };
    pitch: {
        type: NumberConstructor;
        default: any;
    };
    viewMode: {
        type: PropType<"2D" | "3D">;
        default: string;
    };
    features: {
        type: PropType<string[]>;
        default: any;
    };
    layers: {
        type: PropType<AMap.TileLayer[]>;
        default: any;
    };
    zooms: {
        type: PropType<number[]>;
        default: any;
    };
    resizeEnable: {
        type: BooleanConstructor;
        default: any;
    };
    dragEnable: {
        type: BooleanConstructor;
        default: any;
    };
    zoomEnable: {
        type: BooleanConstructor;
        default: any;
    };
    jogEnable: {
        type: BooleanConstructor;
        default: any;
    };
    pitchEnable: {
        type: BooleanConstructor;
        default: any;
    };
    rotateEnable: {
        type: BooleanConstructor;
        default: any;
    };
    animateEnable: {
        type: BooleanConstructor;
        default: any;
    };
    keyboardEnable: {
        type: BooleanConstructor;
        default: any;
    };
    doubleClickZoom: {
        type: BooleanConstructor;
        default: any;
    };
    scrollWheel: {
        type: BooleanConstructor;
        default: any;
    };
    touchZoom: {
        type: BooleanConstructor;
        default: any;
    };
    touchZoomCenter: {
        type: NumberConstructor;
        default: any;
    };
    showLabel: {
        type: BooleanConstructor;
        default: any;
    };
    defaultCursor: {
        type: StringConstructor;
        default: any;
    };
    isHotspot: {
        type: BooleanConstructor;
        default: any;
    };
    mapStyle: {
        type: StringConstructor;
        default: any;
    };
    wallColor: {
        type: PropType<string | number[]>;
        default: any;
    };
    roofColor: {
        type: PropType<string | number[]>;
        default: any;
    };
    showBuildingBlock: {
        type: BooleanConstructor;
        default: any;
    };
    showIndoorMap: {
        type: BooleanConstructor;
        default: any;
    };
    skyColor: {
        type: PropType<string | number[]>;
        default: any;
    };
    labelRejectMask: {
        type: BooleanConstructor;
        default: any;
    };
    mask: {
        type: PropType<number[]>;
        default: any;
    };
    plugins: {
        type: PropType<PluginOptions[]>;
        default: any;
    };
    events: {
        type: ObjectConstructor;
        default: any;
    };
    onceEvents: {
        type: ObjectConstructor;
        default: any;
    };
}, {
    mapUid: string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    center?: unknown;
    zoom?: unknown;
    rotation?: unknown;
    pitch?: unknown;
    viewMode?: unknown;
    features?: unknown;
    layers?: unknown;
    zooms?: unknown;
    resizeEnable?: unknown;
    dragEnable?: unknown;
    zoomEnable?: unknown;
    jogEnable?: unknown;
    pitchEnable?: unknown;
    rotateEnable?: unknown;
    animateEnable?: unknown;
    keyboardEnable?: unknown;
    doubleClickZoom?: unknown;
    scrollWheel?: unknown;
    touchZoom?: unknown;
    touchZoomCenter?: unknown;
    showLabel?: unknown;
    defaultCursor?: unknown;
    isHotspot?: unknown;
    mapStyle?: unknown;
    wallColor?: unknown;
    roofColor?: unknown;
    showBuildingBlock?: unknown;
    showIndoorMap?: unknown;
    skyColor?: unknown;
    labelRejectMask?: unknown;
    mask?: unknown;
    plugins?: unknown;
    events?: unknown;
    onceEvents?: unknown;
} & {
    viewMode: "2D" | "3D";
} & {
    center?: number[];
    zoom?: number;
    rotation?: number;
    pitch?: number;
    features?: string[];
    layers?: AMap.TileLayer[];
    zooms?: number[];
    resizeEnable?: boolean;
    dragEnable?: boolean;
    zoomEnable?: boolean;
    jogEnable?: boolean;
    pitchEnable?: boolean;
    rotateEnable?: boolean;
    animateEnable?: boolean;
    keyboardEnable?: boolean;
    doubleClickZoom?: boolean;
    scrollWheel?: boolean;
    touchZoom?: boolean;
    touchZoomCenter?: number;
    showLabel?: boolean;
    defaultCursor?: string;
    isHotspot?: boolean;
    mapStyle?: string;
    wallColor?: string | number[];
    roofColor?: string | number[];
    showBuildingBlock?: boolean;
    showIndoorMap?: boolean;
    skyColor?: string | number[];
    labelRejectMask?: boolean;
    mask?: number[];
    plugins?: PluginOptions[];
    events?: Record<string, any>;
    onceEvents?: Record<string, any>;
}>, {
    center: number[];
    zoom: number;
    rotation: number;
    pitch: number;
    viewMode: "2D" | "3D";
    features: string[];
    layers: AMap.TileLayer[];
    zooms: number[];
    resizeEnable: boolean;
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
    defaultCursor: string;
    isHotspot: boolean;
    mapStyle: string;
    wallColor: string | number[];
    roofColor: string | number[];
    showBuildingBlock: boolean;
    showIndoorMap: boolean;
    skyColor: string | number[];
    labelRejectMask: boolean;
    mask: number[];
    plugins: PluginOptions[];
    events: Record<string, any>;
    onceEvents: Record<string, any>;
}>;
export default _default;
