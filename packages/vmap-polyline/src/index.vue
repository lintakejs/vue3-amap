<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'VMapPolyline',

  props: {
    path: Array,
    zIndex: Number,
    bubble: Boolean,
    cursor: String,
    strokeColor: String,
    strokeOpacity: Number,
    strokeWeight: Number,
    borderWeight: Number,
    isOutline: Boolean,
    outlineColor: String,
    draggable: Boolean,
    extData: Object,
    strokeStyle: String as PropType<'solid' | 'dashed'>,
    strokeDasharray: Array as PropType<number[]>,
    lineJoin: String as PropType<'miter' | 'round' | 'bevel'>,
    lineCap: String as PropType<'butt' | 'round' | 'square'>,
    geodesic: Boolean,
    showDir: Boolean,
    // 是否可编辑
    editable: Boolean,
  },

  setup(props) {
    return null
  },
})
</script>
