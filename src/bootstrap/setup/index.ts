import type { App } from 'vue'
import type { Router } from 'vue-router'
import httpSetup from './http.setup'

/**
 * 系统基础功能配置
 * @param app
 */
export default function (_app: App<Element>, router: Router) {
  httpSetup(router)
}
