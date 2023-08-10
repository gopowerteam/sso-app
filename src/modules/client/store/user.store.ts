import { UserRole } from '@/config/enum.config'

export interface UserState {
  accessToken?: string
  refreshToken?: string
  expiresIn?: number
  current?: any
}

function createUserState(): UserState {
  return {

  }
}

export default defineStore('user', {
  state: createUserState,
  getters: {
    isLogin(state) {
      return state.current && state.accessToken
    },
    roles(): UserRole[] {
      return [UserRole.Admin]
    },
  },
  actions: {
    updateToken({ accessToken, refreshToken, expiresIn }: { accessToken: string; refreshToken: string; expiresIn: number }) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.expiresIn = expiresIn
    },
    updateUser(value: any) {
      this.current = value
    },
    logout() {
      this.accessToken = undefined
      this.refreshToken = undefined
      this.expiresIn = undefined
      this.current = undefined
    },
  },
  persist: {
    paths: [
      'accessToken',
      'refreshToken',
      'expiresIn',
    ],
  },
})
