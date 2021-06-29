<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRegisterComponent } from '@/hooks'

export default defineComponent({
  name: 'VMapMarker',

  props: {
    position: Array,
    icon: [Object, String] as PropType<string | AMap.Icon>,
    content: String,
    title: String,
    visible: Boolean,
    zIndex: Number,
    offset: Array,
    anchor: String,
    angle: Number,
    clickable: Boolean,
    draggable: Boolean,
    bubble: Boolean,
    zooms: Array,
    cursor: String,
    topWhenClick: Boolean,
    label: Object as PropType<AMap.LabelOptions>,
    extData: Object,
    // shape
    shape: Object,
    // shadow
    shadow: Object as PropType<AMap.IconOpts>,
    // 事件属性
    events: Object,
    onceEvents: Object,
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
        converters: {
          shape: options => {
            return new AMap.MarkerShape(options)
          },
          shadow: options => {
            return new AMap.Icon(options)
          },
        },
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

    return null
  },
})
</script>
