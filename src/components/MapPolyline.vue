<script lang="tsx">
import { defineComponent, shallowRef } from 'vue'
import { useRegisterComponent } from '../hooks'

export default defineComponent({
  name: 'VMapPolyline',

  props: [
    'zIndex',
    'bubble',
    'cursor',
    'geodesic',
    'isOutline',
    'borderWeight',
    'outlineColor',
    'path',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'strokeStyle',
    'strokeDasharray',
    'lineJoin',
    'lineCap',
    'draggable',
    'extData',
    'showDir',
    // 其他属性
    'editable',
  ],

  setup(props, { expose }) {
    const editor = shallowRef<AMap.PolylineEditor | null>(null)

    const { amapComponent } = useRegisterComponent(
      props,
      (amapInstance, convertProps) => {
        const polyLine = new AMap.Polyline({
          ...convertProps,
          map: amapInstance,
        })
        if (AMap.PolylineEditor) {
          editor.value = new AMap.PolylineEditor(amapInstance, polyLine)
        } else {
          console.warn(
            '如果需要使用VMapPolyline组件editable功能，务必添加AMap.PolylineEditor plugin'
          )
        }

        return polyLine
      },
      {
        handlers: {
          visible: (v) => {
            v === false
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
