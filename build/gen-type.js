/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const { noVAmapPrefixFile } = require('./common')

const outsideImport = /import .* from '..\/(.*?)\/src\/.*/

// global.d.ts
fs.copyFileSync(
  path.resolve(__dirname, '../types/vue-shim.d.ts'),
  path.resolve(__dirname, '../lib/vue3-amap.d.ts'),
)
fs.copyFileSync(
  path.resolve(__dirname, '../types/amap.d.ts'),
  path.resolve(__dirname, '../lib/amap.d.ts'),
)
// index.d.ts
const newIndexPath = path.resolve(__dirname, '../lib/index.d.ts')
fs.copyFileSync(path.resolve(__dirname, '../lib/vue3-amap/index.d.ts'), newIndexPath)
const index = fs.readFileSync(newIndexPath)
const newIndex = index.toString().replace(/@vue3-amap\//g, './')
fs.writeFileSync(newIndexPath, newIndex)

// remove ep
fs.rmdirSync(path.resolve(__dirname, '../lib/vue3-amap'), { recursive: true })

// remove test-utils
// fs.rmdirSync(path.resolve(__dirname, '../lib/test-utils'), { recursive: true })

// component
const libDirPath = path.resolve(__dirname, '../lib')
fs.readdirSync(libDirPath).forEach(comp => {
  if (!noVAmapPrefixFile.test(comp)) {
    if (fs.lstatSync(path.resolve(libDirPath, comp)).isDirectory()) {
      // re-import
      const imp = fs.readFileSync(path.resolve(__dirname, '../lib', comp, 'index.d.ts')).toString()
      if(outsideImport.test(imp) || imp.includes('@vue3-amap/')) {
        const newImp = imp.replace(/vue3-amap\//g, '../')
        fs.writeFileSync(path.resolve(__dirname, '../lib', comp, 'index.d.ts'), newImp)
      }
    }
  }
})

// after components dir renamed
fs.readdirSync(libDirPath).forEach(comp => {
  // check src/*.d.ts exist
  const srcPath = path.resolve(libDirPath, comp, './src')
  if (fs.existsSync(srcPath)) {
    if (fs.lstatSync(srcPath).isDirectory()) {
      fs.readdir(srcPath, 'utf-8', (err, data) => {
        if (err) return
        // replace all @vue3-amap in src/*.d.ts
        data.forEach(f => {
          if (!fs.lstatSync(path.resolve(srcPath, f)).isDirectory()) {
            const imp = fs.readFileSync(path.resolve(srcPath, f)).toString()
            if (imp.includes('@vue3-amap/')) {
              const newImp = imp.replace(/@vue3-amap\//g, '../../')
              fs.writeFileSync(path.resolve(srcPath, f), newImp)
            }
          }
        })
      })
    }
  }
})
