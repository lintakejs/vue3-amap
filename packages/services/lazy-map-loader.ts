import { getScriptSrc } from '@vue3-amap/utils/getScriptSrc'

const MAP_SCRIPT_INIT_CALLBACK = 'mapScriptInitCallback'

const DEFAULT_AMP_CONFIG = {
  // 地图key
  key: null,
  // 地图版本号
  v: '2.0',
  // 地图请求协议
  protocol: 'https',
  // 地图主域名
  hostAndPath: 'webapi.amap.com/maps',
  // 地图插件
  plugin: [],
  // 地图脚本加载后的回调函数名，会绑定在window对象下
  callback: MAP_SCRIPT_INIT_CALLBACK,
}

export default class MapApiLoader {
  private config!: MapConfig

  private scriptLoadingPromise!: Promise<void>

  constructor(config: MapConfig) {
    this.config = {
      ...DEFAULT_AMP_CONFIG,
      ...config,
    }
  }
  /**
   * @description 异步加载地图资源
   * @returns {Promise<void>}
   */
  loader() {
    if (this.scriptLoadingPromise) return this.scriptLoadingPromise
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.defer = true
    script.src = getScriptSrc(this.config)
    this.scriptLoadingPromise = new Promise((resolve, reject) => {
      window[MAP_SCRIPT_INIT_CALLBACK] = () => {
        return resolve()
      }
      script.onerror = error => reject(error)
    })
    document.head.append(script)

    return this.scriptLoadingPromise
  }
}
