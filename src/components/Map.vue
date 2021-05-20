<script lang="tsx">
import { defineComponent, renderSlot, useCssModule } from 'vue'
import { lazyMapApiLoaderInstance } from '../services/injected-map-api'
import { guid } from '../utils/guid'
import { convertProps, useRegisterComponent } from '../hooks'
import { toLngLat } from '../utils/cover-helper'

export default defineComponent({
  name: 'VMap',

  props: [
    // 静态属性
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
    // 动态属性
    'events',
    'onceEvents',
  ],

  setup(props, { slots, expose }) {
    const mapApiLoadPromise = lazyMapApiLoaderInstance?.loader()
    const mapUid = guid()

    const converters = {
      center: (arr: number[]) => {
        return toLngLat(arr)
      },
    }
    // 获取地图实例的promise，异步加载
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
