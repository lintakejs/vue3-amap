<script lang="tsx">
import { defineComponent } from 'vue'
import { initAmapComponent, useRegisterComponent } from '../hooks'

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
  ],

  setup(props, { expose }) {
    const { getAmapInstancePromise } = useRegisterComponent(props)

    const { amapComponent } = initAmapComponent(
      getAmapInstancePromise,
      (amapInstance) => {
        return new AMap.Marker({
          ...props,
          map: amapInstance,
        })
      }
    )

    expose({
      amapComponent,
    })

    return () => null
  },
})
</script>
