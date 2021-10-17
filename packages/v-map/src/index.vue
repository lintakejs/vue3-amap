<template>
  <div class="vue3-amap-container">
    <div :id="mapUid" class="vue3-amap"></div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, onUnmounted, shallowRef, PropType } from 'vue'
import { lazyMapApiLoaderInstance } from '@vue3-amap/services/injected-map-api'
import { guid } from '@vue3-amap/utils/guid'
import { convertProps, useRegisterComponent } from '@vue3-amap/hooks'
import { toLngLat, toPixel } from '@vue3-amap/utils/cover-helper'
import { parseFullName, parseShortName } from '@vue3-amap/utils/parsePluginName'

export default defineComponent({
  name: 'VMap',

  props: {
    center: {
      type: Array as PropType<number[]>,
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
      type: String as PropType<'2D' | '3D'>,
      default: '2D',
    },
    features: {
      type: Array as PropType<string[]>,
      default: undefined,
    },
    layers: {
      type: Array as PropType<AMap.TileLayer[]>,
      default: undefined,
    },
    zooms: {
      type: Array as PropType<number[]>,
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
      type: [String, Array] as PropType<string | number[]>,
      default: undefined,
    },
    roofColor: {
      type: [String, Array] as PropType<string | number[]>,
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
      type: [String, Array] as PropType<string | number[]>,
      default: undefined,
    },
    labelRejectMask: {
      type: Boolean,
      default: undefined,
    },
    mask: {
      type: Array as PropType<number[]>,
      default: undefined,
    },
    // plugins
    plugins: {
      type: Array as PropType<PluginOptions[]>,
      default: undefined,
    },
    // 事件属性
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
    const mapUid = guid()
    const pluginInstanceList = shallowRef<any[]>([])
    const pluginInstanceListenerList = shallowRef<PluginListener[]>([])

    function convertAMapPluginProps(plugin: PluginOptions) {
      switch (plugin.pName) {
        case 'AMap.ToolBar':
          if (plugin.offset && plugin.offset instanceof Array) {
            plugin.offset = toPixel(plugin.offset)
          }
          break
        case 'AMap.Scale':
          if (plugin.offset && plugin.offset instanceof Array) {
            plugin.offset = toPixel(plugin.offset)
          }
          break
      }
      return plugin
    }

    function addPlugins(
      plugins: PluginOptions[] | undefined,
      mapInstance: AMap.Map,
    ) {
      if (!(Array.isArray(plugins))) {
        return
      }
      let _notInjectPlugins = plugins.filter(
        _plugin => !(AMap as any)[_plugin.sName],
      )
      if (!_notInjectPlugins || !_notInjectPlugins.length)
        return addMapControls(plugins, mapInstance)
    }

    function addMapControls(plugins: PluginOptions[], mapInstance: AMap.Map) {
      if (!plugins.length) {
        return
      }

      const pluginInsList = [] as any[]
      const pluginEventsList = [] as PluginListener[]

      plugins.forEach(_plugin => {
        const realPluginOptions = convertAMapPluginProps(_plugin)
        const pluginInstance = new (AMap as any)[realPluginOptions.sName]({
          ...realPluginOptions,
          map: realPluginOptions.map ? realPluginOptions.map : mapInstance,
        })

        pluginInsList.push(pluginInstance)

        pluginInstance instanceof AMap.Control &&
          mapInstance.addControl(pluginInstance)

        if (_plugin.events) {
          for (let k in _plugin.events) {
            let v = _plugin.events[k]
            if (k === 'init') {
              v(pluginInstance)
            } else {
              pluginEventsList.push({
                eventName: k,
                instance: pluginInstance,
              })
              AMap.Event.addListener(pluginInstance, k, v)
            }
          }
        }
      })

      pluginInstanceList.value = pluginInsList
      pluginInstanceListenerList.value = pluginEventsList
    }

    function destroyPlugin() {
      pluginInstanceListenerList.value.forEach(listener => {
        AMap.Event.clearListeners(listener.instance, listener.eventName)
      })

      pluginInstanceList.value.forEach(pluginInstance => {
        if (pluginInstance instanceof AMap.Control) {
          amapComponent.value?.removeControl(pluginInstance)
        } else {
          pluginInstance = null
        }
      })
    }

    const converters = {
      center: (arr?: number[]) => {
        return arr instanceof Array && arr.length === 2 ? toLngLat(arr) : null
      },
      plugins: (pluginList: string[] | PluginOptions[]) => {
        return (pluginList || []).map((oPlugin: string | PluginOptions) => {
          let nPlugin = {}

          if (typeof oPlugin === 'string') {
            nPlugin = {
              pName: parseFullName(oPlugin),
              sName: parseShortName(oPlugin),
            }
          } else {
            oPlugin.pName = parseFullName(oPlugin.pName)
            oPlugin.sName = parseShortName(oPlugin.pName)
            nPlugin = oPlugin
          }

          return nPlugin
        })
      },
    }
    // 获取地图实例的promise，异步加载，并初始化地图控件
    function getReloadAmapPromise () {
      const amapPromise = lazyMapApiLoaderInstance.loader().then(() => new AMap.Map(mapUid, convertProps(props, converters)))
      amapPromise.catch(e => {
        emit('map-sdk-down-failed', e)
      })
      return amapPromise
    }

    const { amapComponent, reloadAmapInstancePromise } = useRegisterComponent(
      props,
      {
        amapInitCb: (amapInstance, convertProps) => {
          addPlugins(convertProps.plugins, amapInstance)
          emit('map-ready')
          return amapInstance
        },
      },
      {
        converters,
        handlers: {
          dragEnable: flag => {
            amapComponent.value?.setStatus({
              dragEnable: flag,
            })
          },
          zoomEnable: flag => {
            amapComponent.value?.setStatus({
              zoomEnable: flag,
            })
          },
          rotateEnable: flag => {
            amapComponent.value?.setStatus({
              rotateEnable: flag,
            })
          },
          doubleClickZoom: flag => {
            amapComponent.value?.setStatus({
              doubleClickZoom: flag,
            })
          },
          scrollWheel: flag => {
            amapComponent.value?.setStatus({
              scrollWheel: flag,
            })
          },
          jogEnable: flag => {
            amapComponent.value?.setStatus({
              jogEnable: flag,
            })
          },
          keyboardEnable: flag => {
            amapComponent.value?.setStatus({
              keyboardEnable: flag,
            })
          },

        },
      },
      getReloadAmapPromise,
    )

    onUnmounted(() => {
      destroyPlugin()
      amapComponent.value?.destroy()
    })

    expose({
      amapComponent,
      reloadAmapInstance: () => {
        reloadAmapInstancePromise(getReloadAmapPromise)
      },
    })

    return {
      mapUid,
    }
  },
})
</script>
