import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import ssr from 'vite-ssr/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ssr({
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
  }), vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssr: {
    external: ['reflect-metadata'],
  },
})
