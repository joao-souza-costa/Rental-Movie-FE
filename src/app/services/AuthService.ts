import useLocalStorage from '../utils/useLocalStorage'
import { usersKey, loggedUserKey } from '@/app/constants/localStorageKeys'
import { EXPIRED_USER_HOURS } from '../constants/envConstants'
import { enumUserStatus, type iUser } from './UserService'

export interface iSignInParams {
  email: string
  password: string
}

const usersStorage = useLocalStorage(usersKey)
const loggedUserStorage = useLocalStorage(loggedUserKey)

export default {
  signIn: (params: iSignInParams) => {
    const users = usersStorage.get() as iUser[] | null
    const user = users?.find(
      (user) =>
        user.email === params.email &&
        user.password === params.password &&
        user.status === enumUserStatus.ACTIVE
    )

    if (!user) throw new Error('Usuário não encontrado na base de usuários')

    loggedUserStorage.set({
      ...user,
      expiresIn: new Date().setHours(EXPIRED_USER_HOURS)
    })

    return Promise.resolve(user.id)
  }
}
