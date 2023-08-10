import { useRequest } from 'virtual:request'
import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'
import { RedirectError } from '../errors/redirect.error'

/**
 * 更新用户数据
 */
function updateCurrentUser() {
  const store = useStore()
  const authService = useRequest(({ AdminService }) => AdminService.AuthService)

  return authService.getCurrentUser().then((data) => {
    store.admin.user.updateUser(data)
  })
}

async function appLaunch() {
  const store = useStore()

  if (!store.app.ready) {
    // 系统初始化逻辑
    store.app.setPlatform('admin')
    // 设置系统准备状态
    store.app.setReady()
    // TODO: APP INIT CODE
  }
}

async function userLaunch({ to }: { to: RouteLocationNormalized; from: RouteLocationNormalized; next: NavigationGuardNext }) {
  const store = useStore()
  const meta = to.meta

  // 未登录用户处理
  if (store.client.user.accessToken && !store.client.user.current) {
    // 更新用户信息
    await updateCurrentUser()

    // TODO USER INIT CODE
  }

  // 非必要授权页面直接进入
  if (meta?.requireAuth && !store.client.user.isLogin) {
    // 重新授权
    throw new RedirectError('/login')
  }
}
/**
 * 系统启动列表
 * @returns
 */
export default function launch(router: Router) {
  router.beforeEach(async (to, from, next) => {
    try {
      if (!to.fullPath.startsWith('/admin/')) {
        await appLaunch()
        await userLaunch({ to, from, next })
      }
      next()
    }
    catch (ex) {
      switch (true) {
        case ex instanceof RedirectError:
          location.replace((ex as RedirectError).redirect)
          break
        default:
          next('/500')
      }
    }
  })
}
