import routes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/admin',
    redirect: '/admin/dashboard',
  },
  ...setupLayouts(routes),
] as RouteRecordRaw[]
