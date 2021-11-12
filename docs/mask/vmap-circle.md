<script setup>
import { ref } from 'vue'

const editable = ref(false)
const center = ref([116.403322, 39.920255])
const event = ref({ 'click': (e) => { console.log('click', e) } })
const editEvent = ref({ 'move': (e) => { console.log('move', e) } })
</script>

# 圆
圆

<ClientOnly>
  <VMap class="map-box" resizeEnable :center="[116.397428, 39.90923]" :zoom="13">
  <VMapCircle 
    strokeColor="#F33" 
    fillColor="#ee2200" 
    :fillOpacity="0.35" 
    :center="center" 
    :radius="1000" 
    :strokeOpacity="1" 
    :strokeWeight="3"
    :events="event"
    :editable="editable"
    :editEvents="editEvent"
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
const center = ref([xxx, xxx])
</script>

<template>
  <VMap>
    <VMapCircle :center="center" />
  </VMap>
</template>
```

### Attributes
参考 [圆](https://lbs.amap.com/api/jsapi-v2/documentation#circle)
额外的一些配置

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| events | 绑定事件 | Record<string, Function> | — | — |
| onceEvents | 绑定事件，只触发一次 | Record<string, Function> | — | — |
| editable | 是否可编辑 | Boolean | — | — |
| editEvent | 编辑实例绑定事件 | Boolean | — | — |