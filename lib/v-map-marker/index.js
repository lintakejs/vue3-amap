import { defineComponent } from 'vue';
import { useRegisterComponent } from '../hooks';

var script = defineComponent({
    name: 'VMapMarker',
    props: {
        position: {
            type: Array,
            default: undefined,
        },
        icon: {
            type: [Object, String],
            default: undefined,
        },
        content: {
            type: [String, Object],
            default: undefined,
        },
        title: {
            type: String,
            default: undefined,
        },
        visible: {
            type: Boolean,
            default: undefined,
        },
        zIndex: {
            type: Number,
            default: undefined,
        },
        offset: {
            type: Array,
            default: undefined,
        },
        anchor: {
            type: String,
            default: undefined,
        },
        angle: {
            type: Number,
            default: undefined,
        },
        clickable: {
            type: Boolean,
            default: undefined,
        },
        draggable: {
            type: Boolean,
            default: undefined,
        },
        bubble: {
            type: Boolean,
            default: undefined,
        },
        zooms: {
            type: Array,
            default: undefined,
        },
        cursor: {
            type: String,
            default: undefined,
        },
        topWhenClick: {
            type: Boolean,
            default: undefined,
        },
        label: {
            type: Object,
            default: undefined,
        },
        extData: {
            type: Object,
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
    },
    setup(props, { expose }) {
        const { amapComponent } = useRegisterComponent(props, {
            amapInitCb: (amapInstance, convertProps) => {
                return new AMap.Marker(Object.assign(Object.assign({}, convertProps), { map: amapInstance }));
            },
        }, {
            handlers: {
                zIndex: nz => {
                    amapComponent.value.setzIndex(nz);
                },
                visible: v => {
                    v === false
                        ? amapComponent.value.hide()
                        : amapComponent.value.show();
                },
            },
        });
        expose({
            amapComponent,
        });
        return () => null;
    },
});

script.__file = "packages/v-map-marker/src/index.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _VMap = script;

export default _VMap;
