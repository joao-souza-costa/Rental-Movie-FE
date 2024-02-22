import axios from 'axios'
import useLocalStorage from '../utils/useLocalStorage'
import { loggedUserKey } from '../constants/localStorageKeys'

export const httpClient = (URL: string, params?: unknown) => {
  const http = axios.create({
    baseURL: URL,
    params: params
  })

  http.interceptors.request.use((config) => {
    const loggedUserStorage = useLocalStorage(loggedUserKey)

    const user = loggedUserStorage.get()

    const isExpired = user.expired < Date.now()

    if (isExpired) throw 'Acesso expirado'

    return config
  })

  return http
}
