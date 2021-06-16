import { watch, shallowRef, provide, inject, onMounted, onUnmounted, defineComponent, openBlock, createBlock, createVNode, renderSlot } from 'vue';
import upperCamelCase from 'uppercamelcase';

function guid() {
    return Date.now().toString(10) + '' + Math.random().toString(10).substr(2, 5);
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const AmapPromise = Symbol('AmapPromise');

function convertSignalProp(key, sourceData, converter) {
    if (converter && converter[key]) {
        return converter[key](sourceData);
    }
    else {
        return sourceData;
    }
}
function convertProps(propsData, converters) {
    const cvProps = {};
    return Object.keys(propsData).reduce((res, _key) => {
        const key = _key;
        const propsValue = convertSignalProp(key, propsData[key], converters);
        if (propsValue === undefined) {
            return res;
        }
        cvProps[key] = propsValue;
        return res;
    }, cvProps);
}

function registerEvents(amapInstance, props) {
    if (props.events) {
        for (const eventName in props.events) {
            amapInstance.on && amapInstance.on(eventName, props.events[eventName]);
        }
    }
    if (props.onceEvents) {
        for (const eventName in props.onceEvents) {
            amapInstance.on &&
                amapInstance.on(eventName, props.onceEvents[eventName], null, true);
        }
    }
}
function unregisterEvents(amapInstance) {
    amapInstance.clearEvents && amapInstance.clearEvents('');
}

function getHandlerFun(prop, amapInstance, handlers) {
    if (handlers && handlers[prop]) {
        return handlers[prop];
    }
    return amapInstance[`set${upperCamelCase(prop)}`] || amapInstance.setOptions;
}
function propWatchFn(propsData, key, amapInstance, handleFun, converters) {
    if (key === 'events') {
        unregisterEvents(amapInstance);
        registerEvents(amapInstance, propsData);
        return;
    }
    if (handleFun && handleFun === amapInstance.setOptions) {
        return handleFun.call(amapInstance, {
            [key]: convertSignalProp(key, propsData[key], converters),
        });
    }
    handleFun.call(amapInstance, convertSignalProp(key, propsData[key], converters));
}
function unInstallWatchFns(unwatchFns) {
    unwatchFns.forEach(unwatch => unwatch());
    return [];
}
function setPropWatchers(propsData, amapInstance, handlers, converters) {
    const unwatchFns = [];
    Object.keys(propsData).forEach(prop => {
        const handleFun = getHandlerFun(prop, amapInstance, handlers);
        if (!handleFun && prop !== 'events')
            return;
        propWatchFn(propsData, prop, amapInstance, handleFun, converters);
        const unWatch = watch(() => propsData[prop], () => {
            propWatchFn(propsData, prop, amapInstance, handleFun, converters);
        });
        unwatchFns.push(unWatch);
    });
    return {
        unwatchFns,
    };
}

function useRegisterComponent(props, initFn, transferredProps, amapPromise) {
    const amapInstance = shallowRef(null);
    const amapComponent = shallowRef(null);
    const editor = shallowRef(undefined);
    const coverPropsUnWatch = shallowRef([]);
    let getAmapInstancePromise;
    if (amapPromise) {
        getAmapInstancePromise = amapPromise;
        provide(AmapPromise, amapPromise);
    }
    else {
        getAmapInstancePromise = inject(AmapPromise);
    }
    onMounted(() => __awaiter(this, void 0, void 0, function* () {
        const amapObj = yield getAmapInstancePromise;
        amapInstance.value = amapObj;
        const converterProps = convertProps(props, transferredProps ? transferredProps.converters : {});
        const amapComponentInit = initFn.amapInitCb(amapInstance.value, converterProps);
        if (amapComponentInit instanceof Promise) {
            const comInstance = yield amapComponentInit;
            amapComponent.value = comInstance;
        }
        else {
            amapComponent.value = amapComponentInit;
        }
        if (initFn.editorInit) {
            editor.value = initFn.editorInit(amapInstance.value, amapComponent.value, converterProps);
        }
        const { unwatchFns } = setPropWatchers(props, amapComponent.value, transferredProps ? transferredProps.handlers : {}, transferredProps ? transferredProps.converters : {});
        coverPropsUnWatch.value = unwatchFns;
    }));
    onUnmounted(() => {
        const componentInstance = amapComponent.value;
        const editorInstance = editor.value;
        if (componentInstance) {
            unregisterEvents(componentInstance);
            componentInstance.setMap && componentInstance.setMap(null);
            componentInstance.close && componentInstance.close();
            editorInstance && editorInstance.close();
            coverPropsUnWatch.value = unInstallWatchFns(coverPropsUnWatch.value);
        }
    });
    return {
        amapComponent,
        editor,
    };
}

function toPixel(arr) {
    return new AMap.Pixel(arr[0], arr[1]);
}
function toLngLat(arr) {
    return new AMap.LngLat(arr[0], arr[1]);
}

const amap_prefix_reg = /^AMap./;
function parseFullName(pluginName) {
    return amap_prefix_reg.test(pluginName) ? pluginName : 'AMap.' + pluginName;
}
function parseShortName(pluginName) {
    return pluginName.replace(amap_prefix_reg, '');
}

var script = defineComponent({
    name: 'VMap',
    props: {
        center: {
            type: Array,
            default: () => ([]),
        },
        zoom: {
            type: Number,
            default: 0,
        },
        rotation: {
            type: Number,
            default: 0,
        },
        pitch: {
            type: Number,
            default: 0,
        },
        viewMode: {
            type: String,
            default: '2D',
        },
        features: {
            type: Array,
            default: () => ([]),
        },
        layers: {
            type: Array,
            default: () => ([]),
        },
        zooms: {
            type: Array,
            default: () => ([]),
        },
        dragEnable: {
            type: Boolean,
            default: true,
        },
        zoomEnable: {
            type: Boolean,
            default: true,
        },
        jogEnable: {
            type: Boolean,
            default: true,
        },
        pitchEnable: {
            type: Boolean,
            default: true,
        },
        rotateEnable: {
            type: Boolean,
            default: true,
        },
        animateEnable: {
            type: Boolean,
            default: true,
        },
        keyboardEnable: {
            type: Boolean,
            default: true,
        },
        doubleClickZoom: {
            type: Boolean,
            default: true,
        },
        scrollWheel: {
            type: Boolean,
            default: true,
        },
        touchZoom: {
            type: Boolean,
            default: true,
        },
        touchZoomCenter: {
            type: Number,
            default: 1,
        },
        showLabel: {
            type: Boolean,
            default: true,
        },
        defaultCursor: {
            type: String,
        },
        isHotspot: {
            type: Boolean,
        },
        mapStyle: {
            type: String,
        },
        wallColor: {
            type: [String, Array],
        },
        roofColor: {
            type: [String, Array],
        },
        showBuildingBlock: {
            type: Boolean,
            default: true,
        },
        showIndoorMap: {
            type: Boolean,
            default: false,
        },
        skyColor: {
            type: [String, Array],
        },
        labelRejectMask: {
            type: Boolean,
            default: false,
        },
        mask: {
            type: Array,
        },
        plugins: {
            type: Array,
        },
        events: {
            type: Array,
        },
        onceEvents: {
            type: Array,
        },
    },
    setup(props, { expose }) {
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
                return toLngLat(arr);
            },
            plugins: (pluginList) => {
                return pluginList.map((oPlugin) => {
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
        });
        const { amapComponent } = useRegisterComponent(props, {
            amapInitCb: (amapInstance, convertProps) => {
                addPlugins(convertProps.plugins, amapInstance);
                return amapInstance;
            },
        }, {
            converters,
            handlers: {
                zoom: flag => {
                    var _a;
                    (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.setStatus({
                        zoomEnable: flag,
                    });
                },
                dragEnable: flag => {
                    var _a;
                    (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.setStatus({
                        dragEnable: flag,
                    });
                },
                rotateEnable: flag => {
                    var _a;
                    (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.setStatus({
                        rotateEnable: flag,
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
script.__file = "packages/vmap/src/index.vue";

script.install = (app) => {
    app.component(script.name, script);
};
const _VMap = script;

export default _VMap;
