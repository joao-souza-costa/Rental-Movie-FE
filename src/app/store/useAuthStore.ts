import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { loggedUserKey } from '../constants/localStorageKeys'
import { HOME_PAGE, LOGIN } from '@/app/constants/route'
import { useQuery } from '@tanstack/vue-query'
import userService from '../services/UserService'
import useLocalStorage from '../utils/useLocalStorage'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const accessToken = ref<boolean>(Boolean(useLocalStorage(loggedUserKey).get().id))

  const { data: user } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => userService.me(),
    enabled: accessToken,
    staleTime: Infinity
  })

  const signin = (token: number): void => {
    accessToken.value = Boolean(token)
    router.push({ path: HOME_PAGE.path })
  }

  const signout = (): void => {
    accessToken.value = Boolean(false)
    router.push(LOGIN)
  }

  return {
    user: user,
    accessToken,
    signin,
    signout
  }
})
