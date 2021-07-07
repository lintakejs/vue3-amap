# 安装
可用 npm 或 yarn 安装

```node
npm install vue3-amap -S
// or
yarn add vue3-amap -S
```

# 快速上手
```js
import { createApp } from 'vue'
import Vue3Amap from 'vue3-amap'
// 目前只支持 高德地图v2.0 的sdk
Vue3Amap.initMapApiLoader({
  key: 'xxxxxx',
  plugin: ['高德地图插件 - 用于请求sdk初始化加载']
})

const app = createApp(App)
app.use(Vue3Map)
```
或者
```js
import { createApp } from 'vue'
import { initMapApiLoader, VMap, VMapMarker } from 'vue3-amap'
// 目前只支持 高德地图v2.0 的sdk
initMapApiLoader({
  key: 'xxxxxx',
  plugin: ['高德地图插件 - 用于请求sdk初始化加载']
})

const app = createApp(App)
app.use(VMap)
app.use(VMapMarker)
```