import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    position: {
        type: ArrayConstructor;
        default: any;
    };
    icon: {
        type: PropType<string | AMap.Icon>;
        default: any;
    };
    content: {
        type: (ObjectConstructor | StringConstructor)[];
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
        type: ArrayConstructor;
        default: any;
    };
    anchor: {
        type: StringConstructor;
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
        type: ArrayConstructor;
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
    label: {
        type: PropType<AMap.LabelOptions>;
        default: any;
    };
    extData: {
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
    icon?: unknown;
    content?: unknown;
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
    label?: unknown;
    extData?: unknown;
    events?: unknown;
    onceEvents?: unknown;
} & {} & {
    position?: unknown[];
    icon?: string | AMap.Icon;
    content?: any;
    title?: string;
    visible?: boolean;
    zIndex?: number;
    offset?: unknown[];
    anchor?: string;
    angle?: number;
    clickable?: boolean;
    draggable?: boolean;
    bubble?: boolean;
    zooms?: unknown[];
    cursor?: string;
    topWhenClick?: boolean;
    label?: AMap.LabelOptions;
    extData?: Record<string, any>;
    events?: Record<string, any>;
    onceEvents?: Record<string, any>;
}>, {
    position: unknown[];
    icon: string | AMap.Icon;
    content: any;
    title: string;
    visible: boolean;
    zIndex: number;
    offset: unknown[];
    anchor: string;
    angle: number;
    clickable: boolean;
    draggable: boolean;
    bubble: boolean;
    zooms: unknown[];
    cursor: string;
    topWhenClick: boolean;
    label: AMap.LabelOptions;
    extData: Record<string, any>;
    events: Record<string, any>;
    onceEvents: Record<string, any>;
}>;
export default _default;
