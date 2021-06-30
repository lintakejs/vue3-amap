<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRegisterComponent } from '@/hooks'

export default defineComponent({
  name: 'VMapPolyline',

  props: {
    path: Array,
    zIndex: Number,
    bubble: Boolean,
    cursor: String,
    strokeColor: String,
    strokeOpacity: Number,
    strokeWeight: Number,
    borderWeight: Number,
    isOutline: Boolean,
    outlineColor: String,
    draggable: Boolean,
    extData: Object,
    strokeStyle: String as PropType<'solid' | 'dashed'>,
    strokeDasharray: Array as PropType<number[]>,
    lineJoin: String as PropType<'miter' | 'round' | 'bevel'>,
    lineCap: String as PropType<'butt' | 'round' | 'square'>,
    geodesic: Boolean,
    showDir: Boolean,
    // 是否展示
    visible: Boolean,
    // 是否可编辑
    editable: Boolean,
  },

  setup(props, { expose }) {
    const { amapComponent, editor } = useRegisterComponent<AMap.Polyline, typeof props>(
      props,
      {
        amapInitCb: (amapInstance, convertProps: any) => {
          return new AMap.Polyline({
            ...convertProps,
            map: amapInstance,
          })
        },
        editorInit: (amapInstance, amapComponent: AMap.Polyline) => {
          if (AMap.PolylineEditor) {
            return new AMap.PolylineEditor(amapInstance, amapComponent)
          } else {
            console.warn(
              '如果需要使用VMapPolyline组件editable功能，务必添加AMap.PolylineEditor plugin',
            )
          }
        },
      },
      {
        handlers: {
          visible: v => {
            v === false
              ? amapComponent.value?.hide()
              : amapComponent.value?.show()
          },
          editable: edit => {
            edit === true ? editor.value?.open() : editor.value?.close()
          },
        },
      },
    )

    expose({
      amapComponent,
    })

    return null
  },
})
</script>
