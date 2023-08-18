import createSSR from 'vite-ssr'
import { setup as styleCollector } from '@css-render/vue3-ssr'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { Router } from 'vue-router'
import * as Vue from 'vue'
import { ID_INJECTION_KEY } from 'element-plus'
import App from './App.vue'
import routes from './router'

import '@unocss/reset/normalize.css'
import 'uno.css'
import viewport from './plugins/viewport.plugin'
import { bootstrap } from './bootstrap'

export default createSSR(App, { routes, styleCollector }, ({ app, router }: { app: Vue.App<Element>; router: Router }) => {
  app.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0,
  })
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)

  app.mixin({ inheritAttrs: false })
  app.use(pinia)
  app.use(viewport, {
    breakpoints: {
      mobile: 320,
      desktop: 1024,
    },
  })

  if (!import.meta.env.SSR)
    bootstrap(app, router)
})
