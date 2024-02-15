import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore({
  id: 'auth',

  state: () => ({
    isAuthenticated: useLocalStorage('isAuthenticated', false)
  }),

  actions: {
    login() {
      this.isAuthenticated = true
    },

    logout() {
      this.isAuthenticated = false
    }
  }
})
