<script lang="tsx">
import { defineComponent, renderSlot, useCssModule, watch } from 'vue'
import { lazyMapApiLoaderInstance } from '../services/injected-map-api'
import { guid } from '../utils/guid'
import { useRegisterComponent } from '../hooks'

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
    // 获取地图实例的promise，异步加载
    const amapPromise = new Promise<AMap.Map>((resolve) => {
      mapApiLoadPromise?.then(() => {
        resolve(new AMap.Map(mapUid, props))
      })
    })

    const { amapInstance, getAmapInstancePromise } = useRegisterComponent(
      props,
      amapPromise
    )
    /**
     * @description 动态响应式地图配置
     */
    watch(
      () => [props.zoom, props.dragEnable, props.rotateEnable],
      (new_status) => {
        amapInstance.value?.setStatus({
          zoomEnable: new_status[0],
          dragEnable: new_status[1],
          rotateEnable: new_status[2],
        })
      }
    )

    expose({
      getAmapInstancePromise,
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
