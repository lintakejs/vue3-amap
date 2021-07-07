import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    path: {
        type: PropType<number[]>;
        default: any;
    };
    zIndex: {
        type: NumberConstructor;
        default: any;
    };
    bubble: {
        type: BooleanConstructor;
        default: any;
    };
    cursor: {
        type: StringConstructor;
        default: any;
    };
    strokeColor: {
        type: StringConstructor;
        default: any;
    };
    strokeOpacity: {
        type: NumberConstructor;
        default: any;
    };
    strokeWeight: {
        type: NumberConstructor;
        default: any;
    };
    fillColor: {
        type: StringConstructor;
        default: any;
    };
    fillOpacity: {
        type: NumberConstructor;
        default: any;
    };
    draggable: {
        type: BooleanConstructor;
        default: any;
    };
    extData: {
        type: ObjectConstructor;
        default: any;
    };
    strokeStyle: {
        type: PropType<"solid" | "dashed">;
        default: any;
    };
    strokeDasharray: {
        type: PropType<number[]>;
        default: any;
    };
    visible: {
        type: BooleanConstructor;
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
    editable: {
        type: BooleanConstructor;
        default: any;
    };
    editEvents: {
        type: ObjectConstructor;
        default: any;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    path?: number[];
    zIndex?: number;
    bubble?: boolean;
    cursor?: string;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    fillColor?: string;
    fillOpacity?: number;
    draggable?: boolean;
    extData?: Record<string, any>;
    strokeStyle?: "solid" | "dashed";
    strokeDasharray?: number[];
    visible?: boolean;
    events?: Record<string, any>;
    onceEvents?: Record<string, any>;
    editable?: boolean;
    editEvents?: Record<string, any>;
}>, {
    path: number[];
    zIndex: number;
    bubble: boolean;
    cursor: string;
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
    fillColor: string;
    fillOpacity: number;
    draggable: boolean;
    extData: Record<string, any>;
    strokeStyle: "solid" | "dashed";
    strokeDasharray: number[];
    visible: boolean;
    events: Record<string, any>;
    onceEvents: Record<string, any>;
    editable: boolean;
    editEvents: Record<string, any>;
}>;
export default _default;
