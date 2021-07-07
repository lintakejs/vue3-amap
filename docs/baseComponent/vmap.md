# 地图基类
地图组件都应该在此基础组件中slot使用

<ClientOnly>
  <VMap class="map-box" resizeEnable />
</ClientOnly>

### demo代码
```js
// app.js
import { initMapApiLoader, VMap } from 'vue3-amap'
// 地图组件需要先注册下载使用
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