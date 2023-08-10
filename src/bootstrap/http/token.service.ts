import type { RequestPlugin, RequestSendOptions } from '@gopowerteam/request'
import dayjs from 'dayjs'
import { useRequest } from 'virtual:request'
import { HeaderService } from './header.service'
import { useStore } from '@/store'

async function updateAdminAccessToken() {
  const authService = useRequest(({ AdminService }) => AdminService.AuthService)
  const store = useStore()

  if (!store.admin.user.expiresIn || !store.admin.user.refreshToken)
    return

  if (dayjs(store.admin.user.expiresIn).isBefore(dayjs().add(15, 'minutes'))) {
    store.admin.user.cleanAccessToken()

    return authService.token([new HeaderService({
      Authorization: `Bearer ${store.admin.user.refreshToken}`,
    })]).then(({ access_token, refresh_token, expires_in }) => {
      store.admin.user.updateToken({
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresIn: expires_in,
      })
    })
  }
}

async function updateClientAccessToken() {
  // const authService = useRequest(({ AdminService }) => AdminService.AuthService)
  // const store = useStore()

  // if (!store.admin.user.expiresIn || !store.admin.user.refreshToken)
  //   return

  // if (dayjs(store.admin.user.expiresIn).isBefore(dayjs().add(15, 'minutes'))) {
  //   store.admin.user.cleanAccessToken()

  //   return authService.token([new HeaderService({
  //     Authorization: `Bearer ${store.admin.user.refreshToken}`,
  //   })]).then(({ access_token, refresh_token, expires_in }) => {
  //     store.admin.user.updateToken({
  //       accessToken: access_token,
  //       refreshToken: refresh_token,
  //       expiresIn: expires_in,
  //     })
  //   })
  // }
}

export class TokenService implements RequestPlugin {
  /**
   * 前置Token
   * @param options
   */
  public async before(options: RequestSendOptions) {
    const store = useStore()

    if (store.app.platform === 'admin' && store.admin.user.accessToken) {
      await updateAdminAccessToken()

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${store.admin.user.accessToken}`,
      }
    }

    if (store.app.platform === 'client' && store.client.user.accessToken) {
      await updateClientAccessToken()

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${store.client.user.accessToken}`,
      }
    }
  }
}
