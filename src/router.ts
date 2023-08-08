import { routes as autoRoutes } from 'vue-router/auto/routes' // 引入文件路由表
import { setupLayouts } from 'virtual:meta-layouts'
import type { RouteRecordRaw } from 'vue-router/auto'

export const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    redirect: '/admin/dashboard',
  },
  ...setupLayouts(autoRoutes),
]
