<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRegisterComponent } from '@/hooks'

export default defineComponent({
  name: 'VMapPolygon',

  props: {
    path: Array,
    zIndex: Number,
    bubble: Boolean,
    cursor: String,
    strokeColor: String,
    strokeOpacity: Number,
    strokeWeight: Number,
    fillColor: String,
    fillOpacity: Number,
    draggable: Boolean,
    extData: Object,
    strokeStyle: String as PropType<'solid' | 'dashed'>,
    strokeDasharray: Array as PropType<number[]>,
    // visible
    visible: Boolean,
    // 是否可编辑
    editable: Boolean,
    // 事件属性
    events: Object,
    onceEvents: Object,
  },

  setup(props, { expose }) {
    const { amapComponent, editor } = useRegisterComponent(props, {
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
            '如果需要使用VMapCircle组件editable功能，务必添加AMap.CircleEditor plugin',
          )
        }
      },
    },
    {
      handlers: {
        visible(flag) {
          flag === false
            ? amapComponent.value.hide()
            : amapComponent.value.show()
        },
        editable: edit => {
          edit === true ? editor.value.open() : editor.value.close()
        },
      },
    })

    expose({
      amapComponent,
      editor,
    })

    return null
  },
})
</script>
