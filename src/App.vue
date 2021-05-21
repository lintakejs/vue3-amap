<script lang="tsx">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const editable = ref(false)
    const center = ref([116.433322, 39.900255])
    return () => (
      <div class="layout">
        <VMap zoom={14} center={[116.433322, 39.900256]}>
          <VMapCircle
            editable={editable.value}
            fillColor="#1791fc"
            radius={1000}
            center={center.value}
          />
        </VMap>
        <div class="bang-actions">
          <a
            class="action"
            onClick={() => {
              editable.value = !editable.value
            }}
          >
            编辑
          </a>
        </div>
      </div>
    )
  },
})
</script>
<style lang="stylus" scoped>
.layout {
  position: absolute;
  left: 0;
  top 0
  bottom 0px
  right 0

  .bang-actions {
    position: absolute
    right 20px
    bottom 20px

    .action {
      cursor pointer
      padding 8px
      background-color #fff
      border-color blue
    }
  }
}
</style>
