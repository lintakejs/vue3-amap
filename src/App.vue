<script lang="tsx">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const mapRefs = ref<any>()
    const mapBandEvents = ref<any>({})

    function clickTest() {
      console.log(mapRefs.value)
    }

    return () => (
      <div class="layout">
        <VMap zoom="1" ref={mapRefs} events={mapBandEvents.value}>
          <VMapMarker />
        </VMap>
        <div class="bang-actions">
          <a
            class="action"
            onClick={() => {
              console.log('click')
              mapBandEvents.value = {
                click: clickTest,
              }
            }}
          >
            绑定事件
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
