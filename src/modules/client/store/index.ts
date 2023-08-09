import { defineStore } from 'pinia'
import useUserStore from './user.store'
import useLayoutStore from './layout.store'

const stores = {
  layout: () => useLayoutStore(),
  user: () => useUserStore(),
}

export const useClientStore = defineStore('client', {
  getters: stores,
})
