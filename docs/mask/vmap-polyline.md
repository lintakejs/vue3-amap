<script setup>
import { ref } from 'vue'

const path = ref([
  [116.362209, 39.887487],
  [116.422897, 39.878002],
  [116.372105, 39.90651],
  [116.428945, 39.89663]
])
const editable = ref(false)
const events = ref({ 
  'click': () => { console.log('click') }, 
})
const editEvents = ref({
  'adjust': () => { console.log('adjust') },
  'end': () => { console.log('end') }
})
</script>

# 折线
折线

<ClientOnly>
  <VMap class="map-box" resizeEnable :center="[116.397428, 39.90923]" :zoom="13">
  <VMapPolyline
    isOutline
    outlineColor="#ffeeff"
    strokeColor="#3366FF"
    strokeStyle="solid"
    lineJoin="round"
    lineCap="round"
    :zIndex="50"
    :strokeDasharray="[10, 5]"
    :strokeOpacity="1"
    :strokeWeight="6"
    :borderWeight="3"
    :path="path"
    :events="events"
    :editable="editable"
    :editEvents="editEvents"
  />
  <div class="input-card" style="width: 12rem;">
    <div class="input-item">
      <input class="btn" type="button" value="开始编辑" @click="editable = true" />
      <input class="btn" type="button" value="结束编辑" @click="editable = false" />
    </div>
  </div>
  </VMap>
</ClientOnly>

### demo代码
```js
// 尽量避免直接使用 常量 作为 props 传入，它会引起其他属性发生变化时，触发props watch，导致表现不一致
<script setup>
import { ref } from 'vue'
const path = ref([xxx, xxx...])
</script>

<template>
  <VMap>
    <VMapPolyline :path="path" />
  </VMap>
</template>
```

### Attributes
参考 [折线](https://lbs.amap.com/api/jsapi-v2/documentation#polyline)
额外的一些配置

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| events | 绑定事件 | Record<string, Function> | — | — |
| onceEvents | 绑定事件，只触发一次 | Record<string, Function> | — | — |
| editable | 是否可编辑 | Boolean | — | — |
| editEvent | 编辑实例绑定事件 | Boolean | — | — |