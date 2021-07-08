<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRegisterComponent } from '@/hooks'
import { toLngLat } from '@/utils/cover-helper'

export default defineComponent({
  name: 'VMapCircle',

  props: {
    center: {
      type: Array as PropType<number[]>,
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
      type: String as PropType<'solid' | 'dashed'>,
      default: undefined,
    },
    strokeDasharray: {
      type: Array as PropType<number[]>,
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
    const { amapComponent, editor } = useRegisterComponent<AMap.Circle, typeof props, AMap.CircleEditor>(
      props,
      {
        amapInitCb: (amapInstance, convertProps: any) => {
          return new AMap.Circle({
            ...convertProps,
            map: amapInstance,
          })
        },
        editorInit: (amapInstance, amapComponentInstance) => {
          if (AMap.CircleEditor) {
            return new AMap.CircleEditor(
              amapInstance,
              amapComponentInstance as AMap.Circle,
            )
          } else {
            console.warn(
              '如果需要使用VMapCircle组件editable功能，务必添加AMap.CircleEditor plugin',
            )
          }
        },
      },
      {
        converters: {
          center: arr => {
            return toLngLat(arr)
          },
        },
        handlers: {
          editable: edit => {
            if (editor.value) {
              edit === true ? editor.value.open() : editor.value.close()
            }
          },
        },
      },
    )

    expose({
      amapComponent,
      editor,
    })

    return () => null
  },
})
</script>
