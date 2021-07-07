<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRegisterComponent } from '@/hooks'

export default defineComponent({
  name: 'VMapText',

  props: {
    position: {
      type: Array as PropType<number[]>,
      default: undefined,
    },
    text: {
      type: [String, Object] as PropType<AMap.LabelOptions | string>,
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
    visible: {
      type: Boolean,
      default: undefined,
    },
    zIndex: {
      type: Number,
      default: undefined,
    },
    offset: {
      type: Array as PropType<number[]>,
      default: undefined,
    },
    anchor: {
      type: String as PropType<'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'>,
      default: undefined,
    },
    angle: {
      type: Number,
      default: undefined,
    },
    clickable: {
      type: Boolean,
      default: undefined,
    },
    draggable: {
      type: Boolean,
      default: undefined,
    },
    bubble: {
      type: Boolean,
      default: undefined,
    },
    zooms: {
      type: Array as PropType<number[]>,
      default: undefined,
    },
    cursor: {
      type: String,
      default: undefined,
    },
    topWhenClick: {
      type: Boolean,
      default: undefined,
    },
    extData: {
      type: Object,
      default: undefined,
    },
    style: {
      type: Object,
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
    return () => null
  },
})
</script>
