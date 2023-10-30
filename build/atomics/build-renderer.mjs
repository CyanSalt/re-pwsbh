import { builtinModules } from 'node:module'
import vue from '@vitejs/plugin-vue'
import reactivityTransform from '@vue-macros/reactivity-transform/vite'
import * as vite from 'vite'
import { requireCommonJS } from '../utils/common.mjs'

const pkg = requireCommonJS(import.meta, '../../package.json')

/**
 * @typedef {import('vite').InlineConfig} InlineConfig
 */

/**
 * @param {NodeJS.ProcessVersions} versions
 */
export default (versions) => vite.build({
  root: 'src/renderer',
  configFile: false,
  envFile: false,
  base: './',
  define: {
    // Optimization
    'process.type': JSON.stringify('renderer'),
    __VUE_OPTIONS_API__: JSON.stringify(false),
  },
  plugins: [
    vue(),
    reactivityTransform(),
  ],
  json: {
    stringify: true,
  },
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true,
    target: `chrome${versions.chrome.split('.')[0]}`,
    assetsDir: '.',
    minify: false,
    rollupOptions: {
      external: [
        /^node:/,
        'electron',
        ...builtinModules,
        ...Object.keys(pkg.dependencies ?? {}),
      ],
      output: {
        format: 'cjs',
        exports: 'named',
        freeze: false,
      },
    },
    commonjsOptions: {
      ignore: [
        'electron',
        ...builtinModules,
      ],
    },
  },
})
