import type { Ref } from 'vue'

type PlatformType = 'client' | 'admin'

export interface AppState {
  platform: PlatformType
  ready: boolean // 系统准备状态
  title: string //  页面标题
  viewport: {
    mobile: Ref<boolean>
  }
}

function createAppState(): AppState {
  return {
    platform: 'client',
    ready: false,
    title: '',
    viewport: {
      mobile: useMediaQuery('(min-width: 300px)'),
    },
  }
}

export default defineStore('app', {
  state: createAppState,
  actions: {
    /**
     * 更新系统状态
     */
    setReady() {
      this.ready = true
    },
    setPlatform(value: PlatformType) {
      this.platform = value
    },
    /**
     * 页面标题
     */
    updateTitle(title: string) {
      this.title = title
    },
  },
})
