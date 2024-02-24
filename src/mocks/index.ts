import { clientsKey, usersKey } from '@/app/constants/localStorageKeys'

import useLocalStorage from '@/app/utils/useLocalStorage'
import usersMocks from './usersMocks'
import clientsMocks from './clientsMocks'

const user = useLocalStorage(usersKey)
const clients = useLocalStorage(clientsKey)

if (!user.get()) user.set(usersMocks)

if (!clients.get()) clients.set(clientsMocks.clients)
