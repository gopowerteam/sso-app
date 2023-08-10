import type { App } from 'vue'
import type { Router } from 'vue-router'
import adminLaunch from './launch/admin.launch'
import clientLaunch from './launch/client.launch'
import setup from './setup'

export const bootstrap = async (app: App<Element>, router: Router) => {
  // 系统基础功能配置
  setup(app, router)

  // 系统初始化逻辑
  adminLaunch(router)
  // 用户初始化逻辑
  clientLaunch(router)
}
