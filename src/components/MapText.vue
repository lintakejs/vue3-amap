<script lang="tsx">
import { useRegisterComponent } from '@/hooks'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VMapText',

  props: [
    'position',
    'text',
    'title',
    'zIndex',
    'offset',
    'anchor',
    'angle',
    'clickable',
    'draggable',
    'bubble',
    'zooms',
    'cursor',
    'topWhenClick',
    'extData',
    'style',
    // 特殊属性
    'events',
    'visible',
  ],

  setup(props, { expose }) {
    const { amapComponent } = useRegisterComponent(
      props,
      (amapInstance, convertProps) => {
        return new AMap.Text({
          ...convertProps,
          map: amapInstance,
        })
      },
      {
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
    expose({ amapComponent })
    return () => null
  },
})
</script>
