const noVAmapPrefixFile = /(utils|config|services|theme-chalk)/

module.exports = {
  noVAmapPrefixFile: noVAmapPrefixFile,
  excludeNoVAmapPrefixFile:  packageName => {
    return packageName.includes('@vue3-amap') && !noVAmapPrefixFile.test(packageName)
  },
}
