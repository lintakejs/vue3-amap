import _extends from "@babel/runtime/helpers/extends";

function getScriptSrc(config) {
  var paramKeys = ['v', 'key', 'plugin', 'callback'];
  var params = Object.keys(config).filter(function (k) {
    return ~paramKeys.indexOf(k);
  }).filter(function (k) {
    return config[k] != null;
  }).filter(function (k) {
    return !Array.isArray(config[k]) || Array.isArray(config[k]) && config[k].length > 0;
  }).map(function (k) {
    var v = config[k];
    if (Array.isArray(v)) return {
      key: k,
      value: v.join(',')
    };
    return {
      key: k,
      value: v
    };
  }).map(function (entry) {
    return entry.key + "=" + entry.value;
  }).join('&');
  return config.protocol + "://" + config.hostAndPath + "?" + params;
}

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
    var _this = this;

    if (this.scriptLoadingPromiseResolve) return this.scriptLoadingPromise;
    this.scriptLoadingPromiseResolve = true;

    if (this.scriptDom) {
      document.head.removeChild(this.scriptDom);
      this.scriptDom = null;
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.defer = true;
    script.src = getScriptSrc(this.config);
    this.scriptDom = script;
    this.scriptLoadingPromise = new Promise(function (resolve, reject) {
      window[MAP_SCRIPT_INIT_CALLBACK] = function () {
        return resolve();
      };

      script.onerror = function (error) {
        _this.scriptLoadingPromiseResolve = false;
        reject(error);
      };
    });
    document.head.append(script);
    return this.scriptLoadingPromise;
  };

  return MapApiLoader;
}();

export { MapApiLoader as default };