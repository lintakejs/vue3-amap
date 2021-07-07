# 文本
文本

<ClientOnly>
  <VMap class="map-box" resizeEnable viewMode="3D" :center="[116.4, 39.92]" :zoom="13">
  <VMapText 
    draggable
    text="纯文本标记"
    anchor="center"
    cursor="pointer"
    :style="{
      'padding': '.75rem 1.25rem',
      'margin-bottom': '1rem',
      'border-radius': '.25rem',
      'background-color': 'white',
      'width': '15rem',
      'border-width': 0,
      'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
      'text-align': 'center',
      'font-size': '20px',
      'color': 'blue'
    }"
    :angle="10"
    :position="[116.396923,39.918203]"
  />
  </VMap>
</ClientOnly>

### demo代码
```js
// 注册地图基类组件后
<template>
  <VMap>
    <VMapText text="xxxx" :position="[xxx, xxx]" />
  </VMap>
</template>
```

### Attributes
参考 [文本](https://lbs.amap.com/api/jsapi-v2/documentation#text)
额外的一些配置

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| events | 绑定事件 | Record<string, Function> | — | — |
| onceEvents | 绑定事件，只触发一次 | Record<string, Function> | — | — |