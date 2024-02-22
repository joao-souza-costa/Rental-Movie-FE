import { loggedUserKey, usersKey } from '../constants/localStorageKeys'
import useLocalStorage from '../utils/useLocalStorage'

export enum enumUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
export const STATUS_LABELS: { [key in enumUserStatus]: string } = {
  [enumUserStatus.ACTIVE]: 'Ativo',
  [enumUserStatus.INACTIVE]: 'Inativo'
}

export interface iUser {
  id: number
  name: string
  email: string
  document: string
  password: string
  status: enumUserStatus
  expiresIn: number
}

export interface iCreateUserParams extends Omit<iUser, 'status' | 'id'> {
  email: string
  name: string
  password: string
}

const loggedUserStorage = useLocalStorage(loggedUserKey)
const usersStorage = useLocalStorage(usersKey)

export default {
  me: () => {
    return Promise.resolve(loggedUserStorage.get() as iUser)
  },
  create: (params: iCreateUserParams) => {
    let users = usersStorage.get() as iUser[] | null
    if (!users) users = []

    const hasEmail = users?.find((user) => user.email === params.email)

    if (hasEmail) throw new Error('Email já cadastrado')

    const hasDocument = users?.find((user) => user.document === params.document)

    if (hasDocument) throw new Error('CPF já cadastrado')

    const user = { ...params, id: Math.random(), status: enumUserStatus.ACTIVE }

    users.push(user)
    usersStorage.set(users)
    return Promise.resolve(user.id)
  },
  getAll: () => {
    return Promise.resolve(usersStorage.get())
  },
  update: (params: iUser) => {
    const userBd = usersStorage.get() as iUser[] | null

    const hasClient = userBd?.find((client) => client.id === params.id)

    if (!hasClient) throw new Error('Cliente não existe')

    const filteredBd = userBd?.filter((item) => item.id !== params.id)

    const hasEmail = filteredBd?.find((client) => client.email === params.email)

    if (hasEmail) throw new Error('Email já cadastrado')

    const hasDocument = filteredBd?.find((client) => client.document === params.document)

    if (hasDocument) throw new Error('CPF já cadastrado')

    filteredBd!.push(params)
    usersStorage.set(filteredBd)

    return Promise.resolve(params.id)
  }
}
