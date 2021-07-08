<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRegisterComponent } from '@vue3-amap/hooks'

export default defineComponent({
  name: 'VMapPolyline',

  props: {
    path: {
      type: Array as PropType<number[]>,
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
      type: String as PropType<'solid' | 'dashed'>,
      default: undefined,
    },
    strokeDasharray: {
      type: Array as PropType<number[]>,
      default: undefined,
    },
    lineJoin: {
      type: String as PropType<'miter' | 'round' | 'bevel'>,
      default: undefined,
    },
    lineCap: {
      type: String as PropType<'butt' | 'round' | 'square'>,
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
    // 是否展示
    visible: {
      type: Boolean,
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
    // 是否可编辑
    editable: {
      type: Boolean,
      default: undefined,
    },
    // 编辑器实例绑定事件
    editEvents: {
      type: Object,
      default: undefined,
    },
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
            if (editor.value) {
              edit === true ? editor.value?.open() : editor.value?.close()
            }
          },
        },
      },
    )

    expose({
      amapComponent,
    })

    return () => null
  },
})
</script>
