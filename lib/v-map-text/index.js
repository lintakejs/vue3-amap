import { defineComponent } from 'vue';
import { useRegisterComponent } from '../hooks';

var script = defineComponent({
    name: 'VMapText',
    props: {
        position: {
            type: Array,
            default: undefined,
        },
        text: {
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
        extData: {
            type: Object,
            default: undefined,
        },
        style: {
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
                return new AMap.Text(Object.assign(Object.assign({}, convertProps), { map: amapInstance }));
            },
        }, {
            handlers: {
                zIndex: nz => {
                    var _a;
                    (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.setzIndex(nz);
                },
                visible: v => {
                    var _a, _b;
                    v === false
                        ? (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.hide()
                        : (_b = amapComponent.value) === null || _b === void 0 ? void 0 : _b.show();
                },
            },
        });
        expose({ amapComponent });
        return () => null;
    },
});

script.__file = "packages/v-map-text/src/index.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _VMap = script;

export { _VMap as default };
