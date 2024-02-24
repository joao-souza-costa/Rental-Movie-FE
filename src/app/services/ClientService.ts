import { clientsKey } from '../constants/localStorageKeys'
import useLocalStorage from '../utils/useLocalStorage'
import type { iRentalMovie } from './RentalService'

const clientsStorage = useLocalStorage(clientsKey)

export interface iClient {
  id: number
  firstName: string
  lastName: string
  document: string
  email: string
  cellphone: string
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
  status: enumClientStatus
  rentals: iRentalMovie[]
}

export enum enumClientStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ALL = 'ALL'
}

export const STATUS_LABELS: { [key in enumClientStatus]: string } = {
  [enumClientStatus.ACTIVE]: 'Ativo',
  [enumClientStatus.INACTIVE]: 'Inativo',
  [enumClientStatus.ALL]: 'Todos'
}

export type iCreateClientParams = Omit<iClient, 'id' | 'status' | 'rentals'>
export type iUpdateClientParams = Omit<iClient, 'rentals'>

export interface iGetAllClientsFilters extends Partial<Pick<iClient, 'document' | 'status'>> {
  name?: string
}

export default {
  create: async (params: iCreateClientParams) => {
    const clientBd = clientsStorage.get() as iClient[] | null

    const client = { ...params, id: Math.random(), status: enumClientStatus.ACTIVE, rentals: [] }

    if (!clientBd) {
      clientsStorage.set([client])
      return Promise.resolve(client.id)
    }

    const hasEmail = clientBd?.find((client) => client.email === params.email)

    if (hasEmail) throw new Error('Email já cadastrado')

    const hasDocument = clientBd?.find((client) => client.document === params.document)

    if (hasDocument) throw new Error('CPF já cadastrado')

    clientBd.push(client)
    clientsStorage.set(clientBd)

    return Promise.resolve(client.id)
  },
  getAll: async () => {
    return (clientsStorage.get() as iClient[]) || []
  },
  update: async (params: iUpdateClientParams) => {
    const clientBd = clientsStorage.get() as iClient[] | null

    const hasClient = clientBd?.find((client) => client.id === params.id)

    if (!hasClient) throw new Error('Cliente não existe')

    const filteredBd = clientBd?.filter((item) => item.id !== params.id)

    const hasEmail = filteredBd?.find((client) => client.email === params.email)

    if (hasEmail) throw new Error('Email já cadastrado')

    const hasDocument = filteredBd?.find((client) => client.document === params.document)

    if (hasDocument) throw new Error('CPF já cadastrado')

    filteredBd!.push({ ...hasClient, ...params })
    clientsStorage.set(filteredBd)

    return Promise.resolve(params.id)
  },
  handleFilter(filters: iGetAllClientsFilters) {
    return (acc: iClient[], client: iClient) => {
      let hasFirstName = true
      let hasDocument = true
      let hasStatus = true

      if (filters.name) {
        const name = `${client.firstName} ${client.lastName}`
        hasFirstName = name.toLocaleLowerCase().includes(filters.name.toLocaleLowerCase())
      }
      if (filters.document) {
        hasDocument = client.document.startsWith(filters.document)
      }
      if (filters.status !== enumClientStatus.ALL) {
        hasStatus = filters.status === client.status
      }

      if (hasFirstName && hasDocument && hasStatus) {
        acc.push(client)
      }
      return acc
    }
  }
}
