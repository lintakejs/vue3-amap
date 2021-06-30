<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRegisterComponent } from '@/hooks'

export default defineComponent({
  props: {
    position: Array as PropType<number[]>,
    text: Object as PropType<AMap.LabelOptions>,
    title: String,
    visible: Boolean,
    zIndex: Number,
    offset: Array as PropType<number[]>,
    anchor: String as PropType<'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'>,
    angle: Number,
    clickable: Boolean,
    draggable: Boolean,
    bubble: Boolean,
    zooms: Array as PropType<number[]>,
    cursor: String,
    topWhenClick: Boolean,
    extData: Object,
    style: Object,
    // 事件属性
    events: Object,
    onceEvents: Object,
  },

  setup(props, { expose }) {
    const { amapComponent } = useRegisterComponent<AMap.Text, typeof props>(
      props,
      {
        amapInitCb: (amapInstance, convertProps: any) => {
          return new AMap.Text({
            ...convertProps,
            map: amapInstance,
          })
        },
      },
      {
        handlers: {
          zIndex: nz => {
            amapComponent.value?.setzIndex(nz)
          },
          visible: v => {
            v === false
              ? amapComponent.value?.hide()
              : amapComponent.value?.show()
          },
        },
      },
    )
    expose({ amapComponent })
    return null
  },
})
</script>
