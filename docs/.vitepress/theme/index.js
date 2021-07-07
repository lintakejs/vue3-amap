import DefaultTheme from 'vitepress/theme'
import Vue3AMap from '../../../lib/index.esm.js'
import '../../../lib/theme-chalk/index.css'
import './common.styl'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    Vue3AMap.initMapApiLoader({
      key: '17baa62a7cc987d619f80dbeaa723620',
      plugin: ['AMap.CircleEditor', 'AMap.PolygonEditor', 'AMap.PolylineEditor'],
    })

    app.use(Vue3AMap)
  }
}