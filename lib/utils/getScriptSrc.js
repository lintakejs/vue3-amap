export function getScriptSrc(config) {
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