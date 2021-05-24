<script lang="tsx">
import { defineComponent, renderSlot, useCssModule } from 'vue'
import { lazyMapApiLoaderInstance } from '@/services/injected-map-api'
import { guid } from '@/utils/guid'
import { convertProps, useRegisterComponent } from '@/hooks'
import { toLngLat, toPixel } from '@/utils/cover-helper'
import { parseFullName, parseShortName } from '@/utils/parsePluginName'

interface PluginOptions {
  pName: string
  sName: string
  position?: number[]
  offset?: number[] | AMap.Pixel
  events?: Record<string, any>
}

export default defineComponent({
  name: 'VMap',

  props: [
    'center',
    'zoom',
    'rotation',
    'pitch',
    'viewMode',
    'features',
    'layers',
    'zooms',
    'dragEnable',
    'zoomEnable',
    'jogEnable',
    'pitchEnable',
    'rotateEnable',
    'animateEnable',
    'keyboardEnable',
    'doubleClickZoom',
    'scrollWheel',
    'touchZoom',
    'touchZoomCenter',
    'showLabel',
    'defaultCursor',
    'isHotspot',
    'mapStyle',
    'wallColor',
    'roofColor',
    'showBuildingBlock',
    'showIndoorMap',
    'skyColor',
    'labelRejectMask',
    'mask',
    // 特殊属性
    'plugins',
    'events',
    'onceEvents',
  ],

  setup(props, { slots, expose }) {
    const mapApiLoadPromise = lazyMapApiLoaderInstance?.loader()
    const mapUid = guid()

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

    function addPlugins(plugins: PluginOptions[], mapInstance: AMap.Map) {
      let _notInjectPlugins = plugins.filter(
        (_plugin) => !(AMap as any)[_plugin.sName]
      )
      if (!_notInjectPlugins || !_notInjectPlugins.length)
        return addMapControls(plugins, mapInstance)
    }

    function addMapControls(plugins: PluginOptions[], mapInstance: AMap.Map) {
      if (!plugins.length) {
        return
      }

      plugins.forEach((_plugin) => {
        const realPluginOptions = convertAMapPluginProps(_plugin)
        const pluginInstance = new (AMap as any)[realPluginOptions.sName](
          realPluginOptions
        )
        console.log(pluginInstance)
        mapInstance.addControl(pluginInstance)
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
    const amapPromise = new Promise<AMap.Map>((resolve) => {
      mapApiLoadPromise?.then(() => {
        resolve(new AMap.Map(mapUid, convertProps(props, converters)))
      })
    })

    const { amapInstance } = useRegisterComponent(
      props,
      (amapInstance) => {
        return amapInstance
      },
      {
        converters,
        handlers: {
          plugins: function (nPluginList) {
            amapInstance.value && addPlugins(nPluginList, amapInstance.value)
          },
          zoom: (flag) => {
            amapInstance.value?.setStatus({
              zoomEnable: flag,
            })
          },
          dragEnable: (flag) => {
            amapInstance.value?.setStatus({
              dragEnable: flag,
            })
          },
          rotateEnable: (flag) => {
            amapInstance.value?.setStatus({
              rotateEnable: flag,
            })
          },
        },
      },
      amapPromise
    )

    expose({
      amapInstance,
    })

    const style = useCssModule()
    return () => (
      <div class={style['map-container']}>
        <div id={mapUid} class={style['map-box']}></div>
        {renderSlot(slots, 'default')}
      </div>
    )
  },
})
</script>
<style lang="stylus" module>
.map-container {
  height: 100%;

  .map-box {
    height: 100%;
  }
}
</style>
