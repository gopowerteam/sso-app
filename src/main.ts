import createSSR from 'vite-ssr'
import App from './App.vue'
import { routes } from './router'

import '@unocss/reset/tailwind.css'
import 'uno.css'

export default createSSR(App, { routes }, (context) => {
  /* Vite SSR main hook for custom logic */
  const { app, router, initialState } = context
  app.mixin({ inheritAttrs: false })
  const state = globalThis.__initialState__ || initialState
  console.log (state)
})
