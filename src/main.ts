import createSSR from 'vite-ssr'
import { setup as styleCollector } from '@css-render/vue3-ssr'

import App from './App.vue'
import { routes } from './router'

import '@unocss/reset/normalize.css'
import 'uno.css'

export default createSSR(App, { routes, styleCollector }, ({ app }) => {
  // app.provide(ID_INJECTION_KEY, {
  //   prefix: 1024,
  //   current: 0,
  // })

  app.mixin({ inheritAttrs: false })
})
