<script setup>
import { ref } from 'vue'

const mapRef = ref(null)
let value = 0
function downFail() {
  console.log(mapRef.value)
  if(mapRef.value && !value) {
    setTimeout(() => {
      value++
      mapRef.value.reloadAmapInstance()
    }, 10000)
  }
}

function ready() {
  console.log('ready')
}
</script>
# 地图基类
地图组件都应该在此基础组件中slot使用

<ClientOnly>
  <VMap class="map-box" resizeEnable ref="mapRef" @map-sdk-down-failed="downFail" @map-ready="ready" />
</ClientOnly>

### demo代码
```js
// app.js
import { initMapApiLoader, VMap } from 'vue3-amap'
// 地图组件需要先注册
initMapApiLoader({
  key: 'xxx'
})
app.component(VMap.name, VMap)

// demo.vue
<template>
  <VMap />
</template>
```

### Attributes
参考 [地图对象类](https://lbs.amap.com/api/jsapi-v2/documentation#map)
额外的一些配置

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| plugins   | 插件列表     | PluginOptions[] | — | — |
| events | 绑定事件 | Record<string, Function> | — | — |
| onceEvents | 绑定事件，只触发一次 | Record<string, Function> | — | — |

refs提供重新下载的钩子，以及准备完毕与对象生成失败的钩子。
reloadAmapInstance() 可以重新发起地图sdk下载，同时重新生成渲染对象与事件绑定，之前的绑定则时效。
@map-sdk-down-failed sdk下载失败会触发此事件。
@map-ready 地图主对象准备完毕，只有 VMap 组件提供。
```js
// 类型注释
interface PluginOptions {
  pName: string
  sName: string
  position?: number[]
  offset?: number[]
  map?: AMap.Map
  events?: Record<string, any>
}
```