import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { loggedUserKey } from '../constants/localStorageKeys'
import { HOME_PAGE, LOGIN } from '@/app/constants/route'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import userService from '../services/UserService'
import useLocalStorage from '../utils/useLocalStorage'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const accessToken = ref<boolean>(Boolean(useLocalStorage(loggedUserKey).get()?.id))

  const queryClient = useQueryClient()
  const { data: user, refetch } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => userService.me(),
    enabled: accessToken,
    staleTime: Infinity
  })

  const signin = (token: number): void => {
    accessToken.value = Boolean(token)
    refetch()
    router.push({ path: HOME_PAGE.path })
  }

  const signout = (): void => {
    accessToken.value = Boolean(false)
    useLocalStorage(loggedUserKey).set('')
    queryClient.invalidateQueries({ queryKey: ['users', 'me'] })

    router.push(LOGIN)
  }

  return {
    user: user,
    accessToken,
    signin,
    signout
  }
})
