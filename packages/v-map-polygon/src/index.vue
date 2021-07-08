<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRegisterComponent } from '@vue3-amap/hooks'

export default defineComponent({
  name: 'VMapPolygon',

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
      type: String as PropType<'solid' | 'dashed'>,
      default: undefined,
    },
    strokeDasharray: {
      type: Array as PropType<number[]>,
      default: undefined,
    },
    // visible
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
    const { amapComponent, editor } = useRegisterComponent<AMap.Polygon, typeof props>(props, {
      amapInitCb: (amapInstance, convertProps: any) => {
        return new AMap.Polygon({
          ...convertProps,
          map: amapInstance,
        })
      },
      editorInit: (amapInstance, amapComponentInstance: AMap.Polygon) => {
        if (AMap.PolygonEditor) {
          return new AMap.PolygonEditor(amapInstance, amapComponentInstance)
        } else {
          console.warn(
            '如果需要使用VMapCircle组件editable功能，务必添加AMap.PolygonEditor plugin',
          )
        }
      },
    },
    {
      handlers: {
        visible: flag => {
          flag === false
            ? amapComponent.value.hide()
            : amapComponent.value.show()
        },
        editable: edit => {
          if (editor.value) {
            edit === true ? editor.value.open() : editor.value.close()
          }
        },
      },
    })

    expose({
      amapComponent,
      editor,
    })

    return () => null
  },
})
</script>
