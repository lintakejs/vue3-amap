const amap_prefix_reg = /^AMap./
/**
 * @description 将简写（去除AMap.前缀）的控件名补全
 * @param pluginName 控件名
 * @returns {string} 完整空间名
 */
export function parseFullName(pluginName: string) {
  return amap_prefix_reg.test(pluginName) ? pluginName : 'AMap.' + pluginName
}
/**
 * @description 获取控件名的简称
 * @param pluginName 控件名
 * @returns {string} 完整空间名
 */
export function parseShortName(pluginName: string) {
  return pluginName.replace(amap_prefix_reg, '')
}
