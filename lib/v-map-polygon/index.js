import { defineComponent } from 'vue';
import { useRegisterComponent } from '../hooks';

var script = defineComponent({
    name: 'VMapPolygon',
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
                return new AMap.Polygon(Object.assign(Object.assign({}, convertProps), { map: amapInstance }));
            },
            editorInit: (amapInstance, amapComponentInstance) => {
                if (AMap.PolygonEditor) {
                    return new AMap.PolygonEditor(amapInstance, amapComponentInstance);
                }
                else {
                    console.warn('如果需要使用VMapCircle组件editable功能，务必添加AMap.PolygonEditor plugin');
                }
            },
        }, {
            handlers: {
                visible: flag => {
                    flag === false
                        ? amapComponent.value.hide()
                        : amapComponent.value.show();
                },
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

script.__file = "packages/v-map-polygon/src/index.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _VMap = script;

export { _VMap as default };
