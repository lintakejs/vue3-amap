<template>
  <div class="vue3-amap-container">
    <div :id="mapUid" class="vue3-amap"></div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, onUnmounted, shallowRef, PropType } from 'vue'
import { lazyMapApiLoaderInstance } from '@/services/injected-map-api'
import { guid } from '@/utils/guid'
import { convertProps, useRegisterComponent } from '@/hooks'
import { toLngLat, toPixel } from '@/utils/cover-helper'
import { parseFullName, parseShortName } from '@/utils/parsePluginName'

export default defineComponent({
  name: 'VMap',

  props: {
    center: {
      type: Array as PropType<number[]>,
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
      type: String as PropType<'2D' | '3D'>,
      default: '2D',
    },
    features: {
      type: Array as PropType<string[]>,
      default: () => ([]),
    },
    layers: {
      type: Array as PropType<AMap.TileLayer[]>,
      default: () => ([]),
    },
    zooms: {
      type: Array as PropType<number[]>,
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
      type: [String, Array] as PropType<string | number[]>,
    },
    roofColor: {
      type: [String, Array] as PropType<string | number[]>,
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
      type: [String, Array] as PropType<string | number[]>,
    },
    labelRejectMask: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: Array as PropType<number[]>,
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
    const mapApiLoadPromise = lazyMapApiLoaderInstance?.loader()
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
      if (!(plugins instanceof Array)) {
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
      center: (arr: number[]) => {
        return toLngLat(arr)
      },
      plugins: (pluginList: string[] | PluginOptions[]) => {
        return pluginList.map((oPlugin: string | PluginOptions) => {
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
    const amapPromise = new Promise<AMap.Map>(resolve => {
      mapApiLoadPromise?.then(() => {
        resolve(new AMap.Map(mapUid, convertProps(props, converters)))
      })
    })

    const { amapComponent } = useRegisterComponent(
      props,
      {
        amapInitCb: (amapInstance, convertProps) => {
          addPlugins(convertProps.plugins, amapInstance)
          return amapInstance
        },
      },
      {
        converters,
        handlers: {
          zoom: flag => {
            amapComponent.value?.setStatus({
              zoomEnable: flag,
            })
          },
          dragEnable: flag => {
            amapComponent.value?.setStatus({
              dragEnable: flag,
            })
          },
          rotateEnable: flag => {
            amapComponent.value?.setStatus({
              rotateEnable: flag,
            })
          },
        },
      },
      amapPromise,
    )

    onUnmounted(() => {
      destroyPlugin()
      amapComponent.value?.destroy()
    })

    expose({
      amapComponent,
    })

    return {
      mapUid,
    }
  },
})
</script>
