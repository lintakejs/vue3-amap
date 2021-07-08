<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRegisterComponent } from '@vue3-amap/hooks'

export default defineComponent({
  name: 'VMapMarker',

  props: {
    position: {
      type: Array,
      default: undefined,
    },
    icon: {
      type: [Object, String] as PropType<string | AMap.Icon>,
      default: undefined,
    },
    content: {
      type: [String, Object],
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
      type: Array,
      default: undefined,
    },
    anchor: {
      type: String,
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
      type: Array,
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
    label: {
      type: Object as PropType<AMap.LabelOptions>,
      default: undefined,
    },
    extData: {
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
    const { amapComponent } = useRegisterComponent<AMap.Marker, typeof props>(
      props,
      {
        amapInitCb: (amapInstance, convertProps: any) => {
          return new AMap.Marker({
            ...convertProps,
            map: amapInstance,
          })
        },
      },
      {
        handlers: {
          zIndex: nz => {
            amapComponent.value.setzIndex(nz)
          },
          visible: v => {
            v === false
              ? amapComponent.value.hide()
              : amapComponent.value.show()
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
