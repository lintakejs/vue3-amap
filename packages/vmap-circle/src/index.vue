<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRegisterComponent } from '@/hooks'
import { toLngLat } from '@/utils/cover-helper'

export default defineComponent({
  name: 'VMapCircle',

  props: {
    center: Array as PropType<number[]>,
    radius: Number,
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
    // 是否可编辑
    editable: Boolean,
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
            edit === true ? editor.value.open() : editor.value.close()
          },
        },
      },
    )

    expose({
      amapComponent,
      editor,
    })

    return null
  },
})
</script>
