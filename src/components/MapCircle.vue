<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import { useRegisterComponent } from '../hooks'
import { toLngLat } from '../utils/cover-helper'

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
    // 其他属性
    'editable',
  ],

  setup(props, { expose }) {
    const editor = shallowRef<AMap.PolygonEditor | null>(null)

    const { amapComponent } = useRegisterComponent(
      props,
      (amapInstance, convertProps) => {
        const circle = new AMap.Circle({
          ...convertProps,
          map: amapInstance,
        })
        if ('editable' in convertProps) {
          if (AMap.CircleEditor) {
            editor.value = new AMap.CircleEditor(amapInstance, circle)
          } else {
            console.warn(
              '如果需要使用VMapCircle组件editable功能，务必添加AMap.CircleEditor plugin'
            )
          }
        }
        return circle
      },
      {
        converters: {
          center: (arr: number[]) => {
            return toLngLat(arr)
          },
        },
        handlers: {
          editable: (edit) => {
            edit === true ? editor.value?.open() : editor.value?.close()
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
