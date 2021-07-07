import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'
// import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import pkg from '../package.json'
const deps = Object.keys(pkg.dependencies)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vue = require('rollup-plugin-vue')

const libMode = process.env.LIBMODE

const output = libMode === 'umd' ? {
  format: 'umd',
  name: 'Vue3Amap',
  file: 'lib/index.js',
} : {
  format: 'es',
  file: 'lib/index.esm.js',
}

export default [
  {
    input: path.resolve(__dirname, '../packages/vue3-amap/index.ts'),
    output: output,
    plugins: [
      // terser(),
      nodeResolve(),
      // commonjs(),
      vue({
        target: 'browser',
        css: false,
        exposeFilename: false,
      }),
      typescript({
        tsconfigOverride: {
          'include': [
            'types/amap.d.ts',
            'types/vue-shim.d.ts',
            'packages/**/*',
          ],
          'exclude': [
            'node_modules',
            'packages/**/__tests__/*',
          ],
        },
        abortOnError: false,
      }),
      babel({ runtimeHelpers: true }),
    ],
    external(id) {
      return /^vue/.test(id)
        || deps.some(k => new RegExp('^' + k).test(id))
    },
  },
]
