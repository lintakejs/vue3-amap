<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import { useRegisterComponent } from '../hooks'

export default defineComponent({
  name: 'VMapPolygon',

  props: [
    'path',
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
        const polygon = new AMap.Polygon({
          ...convertProps,
          map: amapInstance,
        })

        if (AMap.PolygonEditor) {
          editor.value = new AMap.PolygonEditor(amapInstance, polygon)
        } else {
          console.warn(
            '如果需要使用VMapPolygon组件editable功能，务必添加AMap.PolygonEditor plugin'
          )
        }

        return polygon
      },
      {
        handlers: {
          visible(flag) {
            flag === false
              ? amapComponent.value?.hide()
              : amapComponent.value?.show()
          },
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
