import { defineComponent } from 'vue';
import { useRegisterComponent } from '../hooks';

var script = defineComponent({
    name: 'VMapPolyline',
    props: {
        path: {
            type: Array,
            default: undefined,
        },
        zIndex: {
            type: Number,
            default: undefined,
        },
        bubble: {
            type: Boolean,
            default: undefined,
        },
        cursor: {
            type: String,
            default: undefined,
        },
        strokeColor: {
            type: String,
            default: undefined,
        },
        strokeOpacity: {
            type: Number,
            default: undefined,
        },
        strokeWeight: {
            type: Number,
            default: undefined,
        },
        borderWeight: {
            type: Number,
            default: undefined,
        },
        isOutline: {
            type: Boolean,
            default: undefined,
        },
        outlineColor: {
            type: String,
            default: undefined,
        },
        draggable: {
            type: Boolean,
            default: undefined,
        },
        extData: {
            type: Object,
            default: undefined,
        },
        strokeStyle: {
            type: String,
            default: undefined,
        },
        strokeDasharray: {
            type: Array,
            default: undefined,
        },
        lineJoin: {
            type: String,
            default: undefined,
        },
        lineCap: {
            type: String,
            default: undefined,
        },
        geodesic: {
            type: Boolean,
            default: undefined,
        },
        showDir: {
            type: Boolean,
            default: undefined,
        },
        visible: {
            type: Boolean,
            default: undefined,
        },
        events: {
            type: Object,
            default: undefined,
        },
        onceEvents: {
            type: Object,
            default: undefined,
        },
        editable: {
            type: Boolean,
            default: undefined,
        },
        editEvents: {
            type: Object,
            default: undefined,
        },
    },
    setup(props, { expose }) {
        const { amapComponent, editor } = useRegisterComponent(props, {
            amapInitCb: (amapInstance, convertProps) => {
                return new AMap.Polyline(Object.assign(Object.assign({}, convertProps), { map: amapInstance }));
            },
            editorInit: (amapInstance, amapComponent) => {
                if (AMap.PolylineEditor) {
                    return new AMap.PolylineEditor(amapInstance, amapComponent);
                }
                else {
                    console.warn('如果需要使用VMapPolyline组件editable功能，务必添加AMap.PolylineEditor plugin');
                }
            },
        }, {
            handlers: {
                visible: v => {
                    var _a, _b;
                    v === false
                        ? (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.hide()
                        : (_b = amapComponent.value) === null || _b === void 0 ? void 0 : _b.show();
                },
                editable: edit => {
                    var _a, _b;
                    if (editor.value) {
                        edit === true ? (_a = editor.value) === null || _a === void 0 ? void 0 : _a.open() : (_b = editor.value) === null || _b === void 0 ? void 0 : _b.close();
                    }
                },
            },
        });
        expose({
            amapComponent,
        });
        return () => null;
    },
});

script.__file = "packages/v-map-polyline/src/index.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _VMap = script;

export { _VMap as default };
