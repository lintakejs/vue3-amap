import DefaultTheme from 'vitepress/theme'
import '../../../lib/theme-chalk/index.css'
import './common.styl'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    import("../../../lib/index.esm.js").then(Vue3AMap => {
      Vue3AMap.initMapApiLoader({
        key: '17baa62a7cc987d619f80dbeaa723620',
        plugin: ['AMap.CircleEditor', 'AMap.PolygonEditor', 'AMap.PolylineEditor'],
      })
  
      app.use(Vue3AMap)
    })
    
  }
}