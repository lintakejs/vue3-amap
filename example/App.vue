<script lang="tsx">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const editable = ref(false)
    const center = ref([116.433322, 39.900255])
    const marketPosition = ref([116.433322, 39.900255])
    function clickHandle(e) {
      marketPosition.value = [e.lnglat.lng, e.lnglat.lat]
    }
    return () => (
      <div class="layout">
        <VMap
          plugins={['ToolBar']}
          zoom={14}
          center={[116.433322, 39.900256]}
          events={{ click: clickHandle }}
        >
          <VMapMarker position={marketPosition.value} />
          <VMapText
            text="abc"
            anchor="center"
            offset={[0, 15]}
            style={{
              padding: [3, 10],
              fontSize: 12,
              color: '#222',
              backgroundColor: 'rgb(253, 246, 236)',
              borderColor: '#E6A23C',
              borderWidth: 1,
            }}
            position={marketPosition.value}
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
    left 20px
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
