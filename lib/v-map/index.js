import { defineComponent, shallowRef, onUnmounted, openBlock, createBlock, createVNode, renderSlot } from 'vue';
import { lazyMapApiLoaderInstance } from '../services/injected-map-api';
export { initMapApiLoader } from '../services/injected-map-api';
import { guid } from '../utils/guid';
import { convertProps, useRegisterComponent } from '../hooks';
import { toLngLat, toPixel } from '../utils/cover-helper';
import { parseFullName, parseShortName } from '../utils/parsePluginName';

var script = defineComponent({
    name: 'VMap',
    props: {
        center: {
            type: Array,
            default: undefined,
        },
        zoom: {
            type: Number,
            default: undefined,
        },
        rotation: {
            type: Number,
            default: undefined,
        },
        pitch: {
            type: Number,
            default: undefined,
        },
        viewMode: {
            type: String,
            default: '2D',
        },
        features: {
            type: Array,
            default: undefined,
        },
        layers: {
            type: Array,
            default: undefined,
        },
        zooms: {
            type: Array,
            default: undefined,
        },
        resizeEnable: {
            type: Boolean,
            default: undefined,
        },
        dragEnable: {
            type: Boolean,
            default: undefined,
        },
        zoomEnable: {
            type: Boolean,
            default: undefined,
        },
        jogEnable: {
            type: Boolean,
            default: undefined,
        },
        pitchEnable: {
            type: Boolean,
            default: undefined,
        },
        rotateEnable: {
            type: Boolean,
            default: undefined,
        },
        animateEnable: {
            type: Boolean,
            default: undefined,
        },
        keyboardEnable: {
            type: Boolean,
            default: undefined,
        },
        doubleClickZoom: {
            type: Boolean,
            default: undefined,
        },
        scrollWheel: {
            type: Boolean,
            default: undefined,
        },
        touchZoom: {
            type: Boolean,
            default: undefined,
        },
        touchZoomCenter: {
            type: Number,
            default: undefined,
        },
        showLabel: {
            type: Boolean,
            default: undefined,
        },
        defaultCursor: {
            type: String,
            default: undefined,
        },
        isHotspot: {
            type: Boolean,
            default: undefined,
        },
        mapStyle: {
            type: String,
            default: undefined,
        },
        wallColor: {
            type: [String, Array],
            default: undefined,
        },
        roofColor: {
            type: [String, Array],
            default: undefined,
        },
        showBuildingBlock: {
            type: Boolean,
            default: undefined,
        },
        showIndoorMap: {
            type: Boolean,
            default: undefined,
        },
        skyColor: {
            type: [String, Array],
            default: undefined,
        },
        labelRejectMask: {
            type: Boolean,
            default: undefined,
        },
        mask: {
            type: Array,
            default: undefined,
        },
        plugins: {
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
    },
    setup(props, { expose }) {
        const mapApiLoadPromise = lazyMapApiLoaderInstance === null || lazyMapApiLoaderInstance === void 0 ? void 0 : lazyMapApiLoaderInstance.loader();
        const mapUid = guid();
        const pluginInstanceList = shallowRef([]);
        const pluginInstanceListenerList = shallowRef([]);
        function convertAMapPluginProps(plugin) {
            switch (plugin.pName) {
                case 'AMap.ToolBar':
                    if (plugin.offset && plugin.offset instanceof Array) {
                        plugin.offset = toPixel(plugin.offset);
                    }
                    break;
                case 'AMap.Scale':
                    if (plugin.offset && plugin.offset instanceof Array) {
                        plugin.offset = toPixel(plugin.offset);
                    }
                    break;
            }
            return plugin;
        }
        function addPlugins(plugins, mapInstance) {
            if (!(plugins instanceof Array)) {
                return;
            }
            let _notInjectPlugins = plugins.filter(_plugin => !AMap[_plugin.sName]);
            if (!_notInjectPlugins || !_notInjectPlugins.length)
                return addMapControls(plugins, mapInstance);
        }
        function addMapControls(plugins, mapInstance) {
            if (!plugins.length) {
                return;
            }
            const pluginInsList = [];
            const pluginEventsList = [];
            plugins.forEach(_plugin => {
                const realPluginOptions = convertAMapPluginProps(_plugin);
                const pluginInstance = new AMap[realPluginOptions.sName](Object.assign(Object.assign({}, realPluginOptions), { map: realPluginOptions.map ? realPluginOptions.map : mapInstance }));
                pluginInsList.push(pluginInstance);
                pluginInstance instanceof AMap.Control &&
                    mapInstance.addControl(pluginInstance);
                if (_plugin.events) {
                    for (let k in _plugin.events) {
                        let v = _plugin.events[k];
                        if (k === 'init') {
                            v(pluginInstance);
                        }
                        else {
                            pluginEventsList.push({
                                eventName: k,
                                instance: pluginInstance,
                            });
                            AMap.Event.addListener(pluginInstance, k, v);
                        }
                    }
                }
            });
            pluginInstanceList.value = pluginInsList;
            pluginInstanceListenerList.value = pluginEventsList;
        }
        function destroyPlugin() {
            pluginInstanceListenerList.value.forEach(listener => {
                AMap.Event.clearListeners(listener.instance, listener.eventName);
            });
            pluginInstanceList.value.forEach(pluginInstance => {
                var _a;
                if (pluginInstance instanceof AMap.Control) {
                    (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.removeControl(pluginInstance);
                }
                else {
                    pluginInstance = null;
                }
            });
        }
        const converters = {
            center: (arr) => {
                return arr instanceof Array && arr.length === 2 ? toLngLat(arr) : null;
            },
            plugins: (pluginList) => {
                return (pluginList || []).map((oPlugin) => {
                    let nPlugin = {};
                    if (typeof oPlugin === 'string') {
                        nPlugin = {
                            pName: parseFullName(oPlugin),
                            sName: parseShortName(oPlugin),
                        };
                    }
                    else {
                        oPlugin.pName = parseFullName(oPlugin.pName);
                        oPlugin.sName = parseShortName(oPlugin.pName);
                        nPlugin = oPlugin;
                    }
                    return nPlugin;
                });
            },
        };
        const amapPromise = new Promise(resolve => {
            mapApiLoadPromise === null || mapApiLoadPromise === void 0 ? void 0 : mapApiLoadPromise.then(() => {
                resolve(new AMap.Map(mapUid, convertProps(props, converters)));
            });
        });
        const { amapComponent } = useRegisterComponent(props, {
            amapInitCb: (amapInstance, convertProps) => {
                addPlugins(convertProps.plugins, amapInstance);
                return amapInstance;
            },
        }, {
            converters,
            handlers: {
                dragEnable: flag => {
                    var _a;
                    (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.setStatus({
                        dragEnable: flag,
                    });
                },
                zoomEnable: flag => {
                    var _a;
                    (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.setStatus({
                        zoomEnable: flag,
                    });
                },
                rotateEnable: flag => {
                    var _a;
                    (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.setStatus({
                        rotateEnable: flag,
                    });
                },
                doubleClickZoom: flag => {
                    var _a;
                    (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.setStatus({
                        doubleClickZoom: flag,
                    });
                },
                scrollWheel: flag => {
                    var _a;
                    (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.setStatus({
                        scrollWheel: flag,
                    });
                },
                jogEnable: flag => {
                    var _a;
                    (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.setStatus({
                        jogEnable: flag,
                    });
                },
                keyboardEnable: flag => {
                    var _a;
                    (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.setStatus({
                        keyboardEnable: flag,
                    });
                },
            },
        }, amapPromise);
        onUnmounted(() => {
            var _a;
            destroyPlugin();
            (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.destroy();
        });
        expose({
            amapComponent,
        });
        return {
            mapUid,
        };
    },
});

const _hoisted_1 = { class: "vue3-amap-container" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", _hoisted_1, [
    createVNode("div", {
      id: _ctx.mapUid,
      class: "vue3-amap"
    }, null, 8 /* PROPS */, ["id"]),
    renderSlot(_ctx.$slots, "default")
  ]))
}

script.render = render;
script.__file = "packages/v-map/src/index.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _VMap = script;

export default _VMap;
