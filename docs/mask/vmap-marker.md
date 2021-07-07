<script setup>
import { ref } from 'vue'

const showMarker = ref(false)
const icon = ref(undefined)
const content = ref(undefined)

const addMarker = () => {
  showMarker.value = true
}

const hideMarker = () => {
  showMarker.value = false
}

const updateIcon = () => {
  content.value = ""
  icon.value = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png"
}

const updateMarkerContent = () => {
  icon.value = ""
  // 自定义点标记内容
  var markerContent = document.createElement("div");

  // 点标记中的图标
  var markerImg = document.createElement("img");
  markerImg.className = "markerlnglat";
  markerImg.src = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png";
  markerImg.setAttribute('width', '25px');
  markerImg.setAttribute('height', '34px');
  markerContent.appendChild(markerImg);

  // 点标记中的文本
  var markerSpan = document.createElement("span");
  markerSpan.className = 'marker';
  markerSpan.innerHTML = "Hi，我被更新啦！";
  markerContent.appendChild(markerSpan);

  content.value = markerContent
}
</script>
# 点坐标
点标记

<ClientOnly>
  <VMap class="map-box" resizeEnable :center="[116.397428, 39.90923]" :zoom="13">
  <VMapMarker v-if="showMarker" :position="[116.406315, 39.908775]" :icon="icon" :content="content" />
  <div class="input-card">
    <div class="input-item">
      <input class="btn" type="button" value="添加点标记" @click="addMarker" />
      <input class="btn" type="button" value="更新点标记图标" @click="updateIcon" />
    </div>
    <div class="input-item">
      <input class="btn" type="button" value="删除点标记" @click="hideMarker" />
      <input class="btn" type="button" value="更新点标记内容" @click="updateMarkerContent" />
    </div>
  </div>
  </VMap>
</ClientOnly>

### demo代码
```js
// 注册地图基类组件后
<template>
  <VMap>
    <VMapMarker :position="[xxx, xxx]" />
  </VMap>
</template>
```

### Attributes
参考 [点坐标](https://lbs.amap.com/api/jsapi-v2/documentation#marker)
额外的一些配置

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| events | 绑定事件 | Record<string, Function> | — | — |
| onceEvents | 绑定事件，只触发一次 | Record<string, Function> | — | — |