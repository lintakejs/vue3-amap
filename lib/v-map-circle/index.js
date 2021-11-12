import { defineComponent } from 'vue';
import { useRegisterComponent } from '../hooks';
import { toLngLat } from '../utils/cover-helper';

var script = defineComponent({
    name: 'VMapCircle',
    props: {
        center: {
            type: Array,
            default: undefined,
        },
        radius: {
            type: Number,
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
        fillColor: {
            type: String,
            default: undefined,
        },
        fillOpacity: {
            type: Number,
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
                return new AMap.Circle(Object.assign(Object.assign({}, convertProps), { map: amapInstance }));
            },
            editorInit: (amapInstance, amapComponentInstance) => {
                if (AMap.CircleEditor) {
                    return new AMap.CircleEditor(amapInstance, amapComponentInstance);
                }
                else {
                    console.warn('如果需要使用VMapCircle组件editable功能，务必添加AMap.CircleEditor plugin');
                }
            },
        }, {
            converters: {
                center: arr => {
                    return toLngLat(arr);
                },
            },
            handlers: {
                editable: edit => {
                    if (editor.value) {
                        edit === true ? editor.value.open() : editor.value.close();
                    }
                },
            },
        });
        expose({
            amapComponent,
            editor,
        });
        return () => null;
    },
});

script.__file = "packages/v-map-circle/src/index.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _VMap = script;

export { _VMap as default };
