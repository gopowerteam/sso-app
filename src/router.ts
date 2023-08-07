import { routes as autoRoutes } from 'vue-router/auto/routes' // 引入文件路由表
import { setupLayouts } from 'virtual:meta-layouts'

export const routes = setupLayouts(autoRoutes)
