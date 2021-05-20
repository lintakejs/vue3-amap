<script lang="ts">
import { defineComponent } from 'vue'
import { useRegisterComponent } from '../hooks'

export default defineComponent({
  name: 'VMapCircle',

  props: [
    'center',
    'radius',
    'zIndex',
    'bubble',
    'cursor',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'fillColor',
    'fillOpacity',
    'draggable',
    'extData',
    'strokeStyle',
    'strokeDasharray',
  ],

  setup(props, { expose }) {
    const { amapComponent } = useRegisterComponent(
      props,
      (amapInstance, convertProps) => {
        const circle = new AMap.Circle({
          ...convertProps,
          map: amapInstance,
        })

        return circle
      }
    )

    expose({
      amapComponent,
    })
    return () => null
  },
})
</script>
