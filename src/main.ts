import createSSR from 'vite-ssr'
import App from './App.vue'
import { routes } from './router'

export default createSSR(App, { routes }, (context) => {
  /* Vite SSR main hook for custom logic */
  const { app, initialState } = context
  app.mixin({ inheritAttrs: false })
  const state = globalThis.__initialState__ || initialState
  // eslint-disable-next-line no-console
  console.log (state)
})
