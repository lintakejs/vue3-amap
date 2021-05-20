<script lang="tsx">
import { defineComponent } from 'vue'
import { useRegisterComponent } from '../hooks'

export default defineComponent({
  name: 'VMapMarker',

  props: [
    // 动态属性
    'position',
    'anchor',
    'offset',
    'icon',
    'content',
    'topWhenClick',
    'bubble',
    'draggable',
    'raiseOnDrag',
    'cursor',
    'visible',
    'zIndex',
    'angle',
    'autoRotation',
    'animation',
    'shadow',
    'title',
    'clickable',
    'shape',
    'extData',
    'label',
    'events',
    'onceEvents',
    // 其他属性
  ],

  setup(props, { expose }) {
    const { amapComponent } = useRegisterComponent(
      props,
      (amapInstance, convertProps) => {
        return new AMap.Marker({
          ...convertProps,
          map: amapInstance,
        })
      },
      {
        converters: {
          shape: (options) => {
            return new AMap.MarkerShape(options)
          },
          shadow: (options) => {
            return new AMap.Icon(options)
          },
        },
        handlers: {
          zIndex: (nz) => {
            amapComponent.value?.setzIndex(nz)
          },
          visible: (v) => {
            v === false
              ? amapComponent.value?.hide()
              : amapComponent.value?.show()
          },
        },
      }
    )

    expose({
      amapComponent,
    })

    return () => null
  },
})
</script>
