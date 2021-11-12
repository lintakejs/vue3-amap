import { watch, shallowRef, provide, inject, onUnmounted, defineComponent, openBlock, createElementBlock, createElementVNode, renderSlot } from 'vue';
import upperCamelCase from 'uppercamelcase';

function getScriptSrc(config) {
    const paramKeys = ['v', 'key', 'plugin', 'callback'];
    const params = Object.keys(config)
        .filter(k => ~paramKeys.indexOf(k))
        .filter(k => config[k] != null)
        .filter(k => {
        return (!Array.isArray(config[k]) ||
            (Array.isArray(config[k]) &&
                config[k].length > 0));
    })
        .map(k => {
        const v = config[k];
        if (Array.isArray(v))
            return { key: k, value: v.join(',') };
        return { key: k, value: v };
    })
        .map(entry => `${entry.key}=${entry.value}`)
        .join('&');
    return `${config.protocol}://${config.hostAndPath}?${params}`;
}
const MAP_SCRIPT_INIT_CALLBACK = 'mapScriptInitCallback';
const DEFAULT_AMP_CONFIG = {
    key: null,
    v: '2.0',
    protocol: 'https',
    hostAndPath: 'webapi.amap.com/maps',
    plugin: [],
    callback: MAP_SCRIPT_INIT_CALLBACK,
};
class MapApiLoader {
    constructor(config) {
        this.config = Object.assign(Object.assign({}, DEFAULT_AMP_CONFIG), config);
    }
    loader() {
        if (this.scriptLoadingPromiseResolve)
            return this.scriptLoadingPromise;
        this.scriptLoadingPromiseResolve = true;
        if (this.scriptDom) {
            document.head.removeChild(this.scriptDom);
            this.scriptDom = null;
        }
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.defer = true;
        script.src = getScriptSrc(this.config);
        this.scriptDom = script;
        this.scriptLoadingPromise = new Promise((resolve, reject) => {
            window[MAP_SCRIPT_INIT_CALLBACK] = () => {
                return resolve();
            };
            script.onerror = error => {
                this.scriptLoadingPromiseResolve = false;
                reject(error);
            };
        });
        document.head.append(script);
        return this.scriptLoadingPromise;
    }
}

let lazyMapApiLoaderInstance = null;
const initMapApiLoader = function (config) {
    if (lazyMapApiLoaderInstance) {
        console.warn('You has already initial map instance, just import it!');
    }
    lazyMapApiLoaderInstance = new MapApiLoader(config);
};

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
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

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

function registerEvents(amapInstance, props, eventKeys) {
    if (!amapInstance) {
        return;
    }
    eventKeys.map(key => {
        if (props[key]) {
            for (const eventName in props[key]) {
                if (key.includes('once')) {
                    amapInstance.on &&
                        amapInstance.on(eventName, props[key][eventName], null, true);
                }
                else {
                    amapInstance.on && amapInstance.on(eventName, props[key][eventName]);
                }
            }
        }
    });
}
function unregisterEvents(amapInstance) {
    if (!amapInstance) {
        return;
    }
    amapInstance.clearEvents && amapInstance.clearEvents('');
}

function getHandlerFun(prop, amapInstance, handlers) {
    if (handlers && handlers[prop]) {
        return handlers[prop];
    }
    return amapInstance[`set${upperCamelCase(prop)}`] || amapInstance.setOptions;
}
function propWatchFn(propsData, key, amapInstance, handleFun, converters, editInfo) {
    if (propsData[key] === undefined) {
        return;
    }
    if (key === 'events' || key === 'onceEvents') {
        unregisterEvents(amapInstance);
        registerEvents(amapInstance, propsData, ['events', 'onceEvents']);
        return;
    }
    if (key === 'editEvents') {
        unregisterEvents(editInfo.edit.value);
        registerEvents(editInfo.edit.value, propsData, ['editEvents']);
        return;
    }
    if (handleFun && handleFun === amapInstance.setOptions) {
        return handleFun.call(amapInstance, {
            [key]: convertSignalProp(key, propsData[key], converters),
        });
    }
    if (key === 'editable') {
        const editCoverPorpsData = convertSignalProp(key, propsData[key], converters);
        if (editCoverPorpsData === true && editInfo.edit.value === undefined) {
            editInfo.edit.value = editInfo.editInit();
            unregisterEvents(editInfo.edit.value);
            registerEvents(editInfo.edit.value, propsData, ['editEvents']);
        }
    }
    handleFun.call(amapInstance, convertSignalProp(key, propsData[key], converters));
}
function setPropWatchers(propsData, amapInstance, handlers, converters, editInfo) {
    const unwatchFns = [];
    Object.keys(propsData).forEach(prop => {
        const handleFun = getHandlerFun(prop, amapInstance, handlers);
        if (!handleFun && prop !== 'events')
            return;
        propWatchFn(propsData, prop, amapInstance, handleFun, converters, editInfo);
        const unWatch = watch(() => propsData[prop], () => {
            propWatchFn(propsData, prop, amapInstance, handleFun, converters, editInfo);
        });
        unwatchFns.push(unWatch);
    });
    return {
        unwatchFns,
    };
}

function useRegisterComponent(props, initFn, transferredProps, getAmapPromise) {
    const amapInstance = shallowRef(null);
    const amapComponent = shallowRef(null);
    const editor = shallowRef(undefined);
    const coverPropsUnWatch = shallowRef([]);
    let getAmapInstancePromise = shallowRef();
    if (Object.prototype.toString.call(getAmapPromise) === '[object Function]') {
        getAmapInstancePromise.value = getAmapPromise();
        provide(AmapPromise, getAmapInstancePromise);
    }
    else {
        getAmapInstancePromise = inject(AmapPromise);
    }
    const amapInstanceWatcher = watch(() => getAmapInstancePromise.value, newAmapInstancePromise => {
        newAmapInstancePromise.then(() => {
            unAmapObj();
            initAmapObj();
        });
    }, { immediate: true });
    function reloadAmapInstancePromise(reloadPromise) {
        getAmapInstancePromise.value = reloadPromise();
        getAmapInstancePromise.value.then(() => {
            unAmapObj();
            initAmapObj();
        });
    }
    function initAmapObj() {
        return __awaiter(this, void 0, void 0, function* () {
            const amapObj = yield getAmapInstancePromise.value;
            amapInstance.value = amapObj;
            const converterProps = convertProps(props, transferredProps === null || transferredProps === void 0 ? void 0 : transferredProps.converters);
            const amapComponentInit = initFn.amapInitCb(amapInstance.value, converterProps);
            if (Object.prototype.toString.call(amapComponentInit) === '[object Promise]') {
                const comInstance = yield amapComponentInit;
                amapComponent.value = comInstance;
            }
            else {
                amapComponent.value = amapComponentInit;
            }
            const { unwatchFns } = setPropWatchers(props, amapComponent.value, transferredProps === null || transferredProps === void 0 ? void 0 : transferredProps.handlers, transferredProps === null || transferredProps === void 0 ? void 0 : transferredProps.converters, {
                edit: editor,
                editInit: () => {
                    return initFn.editorInit(amapInstance.value, amapComponent.value, converterProps);
                },
            });
            coverPropsUnWatch.value = unwatchFns;
        });
    }
    function unAmapObj() {
        const componentInstance = amapComponent.value;
        const editorInstance = editor.value;
        if (componentInstance) {
            unregisterEvents(componentInstance);
            if ('setMap' in componentInstance) {
                componentInstance.setMap(null);
            }
            if ('close' in componentInstance) {
                componentInstance.close();
            }
            unregisterEvents(editorInstance);
            editorInstance && editorInstance.close();
        }
        coverPropsUnWatch.value.forEach(unwatch => unwatch());
    }
    onUnmounted(() => {
        unAmapObj();
        amapInstanceWatcher();
    });
    return {
        amapComponent,
        editor,
        reloadAmapInstancePromise,
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

var script$5 = defineComponent({
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
    emits: ['map-sdk-down-failed', 'map-ready'],
    setup(props, { expose, emit }) {
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
            if (!(Array.isArray(plugins))) {
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
        function getReloadAmapPromise() {
            const amapPromise = lazyMapApiLoaderInstance.loader().then(() => new AMap.Map(mapUid, convertProps(props, converters)));
            amapPromise.catch(e => {
                emit('map-sdk-down-failed', e);
            });
            return amapPromise;
        }
        const { amapComponent, reloadAmapInstancePromise } = useRegisterComponent(props, {
            amapInitCb: (amapInstance, convertProps) => {
                addPlugins(convertProps.plugins, amapInstance);
                emit('map-ready');
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
        }, getReloadAmapPromise);
        onUnmounted(() => {
            var _a;
            destroyPlugin();
            (_a = amapComponent.value) === null || _a === void 0 ? void 0 : _a.destroy();
        });
        expose({
            amapComponent,
            reloadAmapInstance: () => {
                reloadAmapInstancePromise(getReloadAmapPromise);
            },
        });
        return {
            mapUid,
        };
    },
});

var _hoisted_1 = {
  class: "vue3-amap-container"
};
var _hoisted_2 = ["id"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [createElementVNode("div", {
    id: _ctx.mapUid,
    class: "vue3-amap"
  }, null, 8
  /* PROPS */
  , _hoisted_2), renderSlot(_ctx.$slots, "default")]);
}

script$5.render = render;
script$5.__file = "packages/v-map/src/index.vue";

script$5.install = (app) => {
    app.component(script$5.name, script$5);
};
const _VMap$5 = script$5;

var script$4 = defineComponent({
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

script$4.__file = "packages/v-map-circle/src/index.vue";

script$4.install = (app) => {
    app.component(script$4.name, script$4);
};
const _VMap$4 = script$4;

var script$3 = defineComponent({
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

script$3.__file = "packages/v-map-marker/src/index.vue";

script$3.install = (app) => {
    app.component(script$3.name, script$3);
};
const _VMap$3 = script$3;

var script$2 = defineComponent({
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

script$2.__file = "packages/v-map-polygon/src/index.vue";

script$2.install = (app) => {
    app.component(script$2.name, script$2);
};
const _VMap$2 = script$2;

var script$1 = defineComponent({
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

script$1.__file = "packages/v-map-polyline/src/index.vue";

script$1.install = (app) => {
    app.component(script$1.name, script$1);
};
const _VMap$1 = script$1;

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

const components = [
    _VMap$5,
    _VMap$4,
    _VMap$3,
    _VMap$2,
    _VMap$1,
    _VMap,
];
const install = (app) => {
    components.forEach(component => {
        app.component(component.name, component);
    });
};
var index = {
    install,
    initMapApiLoader,
};

export { _VMap$5 as VMap, _VMap$4 as VMapCirCle, _VMap$3 as VMapMarker, _VMap$2 as VMapPolygon, _VMap$1 as VMapPolyline, _VMap as VMapText, index as default, initMapApiLoader, install };
