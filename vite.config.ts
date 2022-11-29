import { defineConfig } from 'vite'

import unocss from 'unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
import directives from '@unocss/transformer-directives'
import compileClass from '@unocss/transformer-compile-class'

import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'
import preload from 'vite-plugin-inject-preload'
import cssnano from 'cssnano'
import markdown from './scripts/static-markdown'
import { resolve } from 'path'

export default defineConfig({
  css: {
    postcss: {
      plugins: [cssnano({ preset: 'default' })]
    }
  },
  plugins: [
    markdown([
      resolve('public/about-me.md')
    ], resolve('public')),
    unocss({
      presets: [presetUno(), presetIcons({})],
      include: ['src/**/*.tsx', 'src/**/*.vue', 'src/**/*.jsx'],
      transformers: [compileClass({}), directives()],
    }),
    vue(),
    jsx(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {},
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,ts,tsx}'],
        globIgnores: ['**/__sw/**/*.*'],
        vitePlugins: [],
      }
    }),
    preload({
      files: [
        { match: /.*-[a-zA-Z]*\.[a-z-0-9]*\.woff2$/ },
        { match: /.*\.css$/ },
        { match: /.*markdown\-precache.*\.js$/ },
      ],
    }),
  ],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  build: {
    target: ['chrome70'],
  },
})
