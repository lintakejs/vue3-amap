import _extends from "@babel/runtime/helpers/extends";
import { getScriptSrc } from '../utils/getScriptSrc';
var MAP_SCRIPT_INIT_CALLBACK = 'mapScriptInitCallback';
var DEFAULT_AMP_CONFIG = {
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
  callback: MAP_SCRIPT_INIT_CALLBACK
};

var MapApiLoader = /*#__PURE__*/function () {
  function MapApiLoader(config) {
    this.config = _extends({}, DEFAULT_AMP_CONFIG, config);
  }
  /**
   * @description 异步加载地图资源
   * @returns {Promise<void>}
   */


  var _proto = MapApiLoader.prototype;

  _proto.loader = function loader() {
    if (this.scriptLoadingPromise) return this.scriptLoadingPromise;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = getScriptSrc(this.config);
    this.scriptLoadingPromise = new Promise(function (resolve, reject) {
      window[MAP_SCRIPT_INIT_CALLBACK] = function () {
        return resolve();
      };

      script.onerror = function (error) {
        return reject(error);
      };
    });
    document.head.append(script);
    return this.scriptLoadingPromise;
  };

  return MapApiLoader;
}();

export { MapApiLoader as default };