import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    position: {
        type: PropType<number[]>;
        default: any;
    };
    text: {
        type: PropType<string | AMap.LabelOptions>;
        default: any;
    };
    title: {
        type: StringConstructor;
        default: any;
    };
    visible: {
        type: BooleanConstructor;
        default: any;
    };
    zIndex: {
        type: NumberConstructor;
        default: any;
    };
    offset: {
        type: PropType<number[]>;
        default: any;
    };
    anchor: {
        type: PropType<"top-left" | "top-center" | "top-right" | "middle-left" | "center" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right">;
        default: any;
    };
    angle: {
        type: NumberConstructor;
        default: any;
    };
    clickable: {
        type: BooleanConstructor;
        default: any;
    };
    draggable: {
        type: BooleanConstructor;
        default: any;
    };
    bubble: {
        type: BooleanConstructor;
        default: any;
    };
    zooms: {
        type: PropType<number[]>;
        default: any;
    };
    cursor: {
        type: StringConstructor;
        default: any;
    };
    topWhenClick: {
        type: BooleanConstructor;
        default: any;
    };
    extData: {
        type: ObjectConstructor;
        default: any;
    };
    style: {
        type: ObjectConstructor;
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
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    position?: unknown;
    text?: unknown;
    title?: unknown;
    visible?: unknown;
    zIndex?: unknown;
    offset?: unknown;
    anchor?: unknown;
    angle?: unknown;
    clickable?: unknown;
    draggable?: unknown;
    bubble?: unknown;
    zooms?: unknown;
    cursor?: unknown;
    topWhenClick?: unknown;
    extData?: unknown;
    style?: unknown;
    events?: unknown;
    onceEvents?: unknown;
} & {} & {
    position?: number[];
    text?: string | AMap.LabelOptions;
    title?: string;
    visible?: boolean;
    zIndex?: number;
    offset?: number[];
    anchor?: "top-left" | "top-center" | "top-right" | "middle-left" | "center" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right";
    angle?: number;
    clickable?: boolean;
    draggable?: boolean;
    bubble?: boolean;
    zooms?: number[];
    cursor?: string;
    topWhenClick?: boolean;
    extData?: Record<string, any>;
    style?: Record<string, any>;
    events?: Record<string, any>;
    onceEvents?: Record<string, any>;
}>, {
    position: number[];
    text: string | AMap.LabelOptions;
    title: string;
    visible: boolean;
    zIndex: number;
    offset: number[];
    anchor: "top-left" | "top-center" | "top-right" | "middle-left" | "center" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right";
    angle: number;
    clickable: boolean;
    draggable: boolean;
    bubble: boolean;
    zooms: number[];
    cursor: string;
    topWhenClick: boolean;
    extData: Record<string, any>;
    style: Record<string, any>;
    events: Record<string, any>;
    onceEvents: Record<string, any>;
}>;
export default _default;
