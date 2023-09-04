import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ssr from 'vite-ssr/plugin'
import jsx from '@vitejs/plugin-vue-jsx'
import svg from 'vite-svg-loader'
import { defineVitePlugins } from './.vite/plugins'
import { defineViteResolve } from './.vite/resolve'
import { defineViteCSS } from './.vite/css'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'


export default defineConfig({
  ...defineViteResolve(),
  ...defineViteCSS(),
  ...defineVitePlugins([
    ssr({
      build: {
        clientOptions: {
          build: {
            outDir: 'dist/ssr/client',
          },
        },
        serverOptions: {
          build: {
            rollupOptions: {
              output: { format: 'cjs' },
            },
            outDir: 'dist/ssr/server',
          },
        },
        keepIndexHtml: true,
      },
    }),
    vue(),
    jsx(),
    svg(),
    ReactivityTransform()
  ]),
  ssr: {
    external: ['reflect-metadata'],
  },
})
