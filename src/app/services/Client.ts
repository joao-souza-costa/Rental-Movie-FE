import axios from 'axios'
import useLocalStorage from '../utils/useLocalStorage'
import { loggedUserKey } from '../constants/localStorageKeys'
import { useAuthStore } from '../store/useAuthStore'
import { toast } from '../utils/toast'

export const httpClient = (URL: string, params?: unknown) => {
  const http = axios.create({
    baseURL: URL,
    params: params
  })

  http.interceptors.request.use((config) => {
    const loggedUserStorage = useLocalStorage(loggedUserKey)
    const user = loggedUserStorage.get()

    const authStore = useAuthStore()

    const isExpired = user.expiresIn < Date.now()

    if (isExpired) {
      authStore.signout()
      toast.error('Acesso expirado')
    }

    return config
  })

  return http
}
