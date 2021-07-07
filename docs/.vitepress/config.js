module.exports = {
  title: 'vue3-amap',
  description: '基于vue3.0+的高德地图组件',
  lang: "zh-cn",
  themeConfig: {
    sidebar: [
      {
        text: '介绍',
        children: [
          {
            text: '安装',
            link: '/introduction/install'
          }
        ]
      },
      {
        text: '基础组件',
        children: [
          {
            text: '地图基类',
            link: '/baseComponent/vmap'
          }
        ]
      },
      {
        text: '覆盖物',
        children: [
          {
            text: '点坐标',
            link: '/mask/vmap-marker'
          },
          {
            text: '圆',
            link: '/mask/vmap-circle'
          },
          {
            text: '文本',
            link: '/mask/vmap-text'
          },
          {
            text: '多边形',
            link: '/mask/vmap-polygon'
          },
          {
            text: '折线',
            link: '/mask/vmap-polyline'
          }
        ]
      }
    ]
  }
}