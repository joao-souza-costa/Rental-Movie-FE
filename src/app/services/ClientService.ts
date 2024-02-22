import { clientsKey } from '../constants/localStorageKeys'
import { useAuthStore } from '../store/useAuthStore'
import useLocalStorage from '../utils/useLocalStorage'

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

export interface iRentalMovie {
  id: number
  name: string
  user: string
  status: enumRentalStatus
  startDate: string
  deliveryDate: string
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

export enum enumRentalStatus {
  RENTED = 'RENTED',
  CLOSED = 'CLOSED'
}

export const STATUS_RENTAL_LABELS: { [key in enumRentalStatus]: string } = {
  [enumRentalStatus.RENTED]: 'Alugado',
  [enumRentalStatus.CLOSED]: 'Devolvido'
}

export interface iUpdateRentalStatusParams {
  status: enumRentalStatus
  clientId: number
  rentalId: number
}
export interface iAddRentalStatusParams {
  name: string
  dates: Date[]
  clientId: number
}

export interface iRental {
  clientId: number
  clientName: string
  deliveryDate: string
  id: number
  name: string
  startDate: string
  status: enumRentalStatus
  user: string
}

export interface iGetAllClientsFilters
  extends Partial<Pick<iClient, 'document' | 'firstName' | 'status'>> {}

export default {
  create: async (params: Omit<iClient, 'id' | 'status' | 'rentals'>) => {
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
  getAll: async (filters: iGetAllClientsFilters) => {
    const clientBd = clientsStorage.get() as iClient[] | null

    return clientBd?.reduce((acc, value) => {
      let hasFirstName = true
      let hasDocument = true
      let hasStatus = true

      if (filters.firstName) {
        hasFirstName = value.firstName.startsWith(filters.firstName)
      }
      if (filters.document) {
        hasDocument = value.document.startsWith(filters.document)
      }
      if (filters.status !== enumClientStatus.ALL) {
        hasStatus = filters.status === value.status
      }

      if (hasFirstName && hasDocument && hasStatus) {
        acc.push(value)
      }
      return acc
    }, [] as iClient[])
  },
  update: async (params: iClient) => {
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
  addRental(params: iAddRentalStatusParams) {
    const clientBd = clientsStorage.get() as iClient[] | null
    const hasClient = clientBd?.find((client) => client.id === params.clientId)

    if (!hasClient) throw new Error('Cliente não existe')

    const hasActiveRental = hasClient.rentals.find(
      (movie) => movie.status === enumRentalStatus.RENTED
    )

    if (hasActiveRental) throw new Error('Cliente já tem um aluguel vigente')

    const filteredBd = clientBd?.filter((item) => item.id !== params.clientId)

    const authStore = useAuthStore()
    hasClient.rentals.push({
      id: Math.random(),
      user: authStore.user!.name,
      status: enumRentalStatus.RENTED,
      name: params.name,
      startDate: params.dates[0].toISOString(),
      deliveryDate: params.dates[1].toISOString()
    })

    filteredBd?.push(hasClient)
    clientsStorage.set(filteredBd)

    return Promise.resolve(true)
  },
  updateRentalStatus(params: iUpdateRentalStatusParams) {
    const clientBd = clientsStorage.get() as iClient[] | null
    const hasClient = clientBd?.find((client) => client.id === params.clientId)

    if (!hasClient) throw new Error('Cliente não existe')

    const hasActiveRental = hasClient.rentals.find((movie) => movie.id === params.rentalId)

    if (!hasActiveRental) throw new Error('Cliente não tem nenhum aluguel')

    const filteredBd = clientBd?.filter((item) => item.id !== params.clientId)
    const filteredRentals = hasClient.rentals?.filter((item) => item.id !== params.rentalId)

    hasClient.rentals = [...filteredRentals, { ...hasActiveRental, status: params.status }]

    filteredBd?.push(hasClient)
    clientsStorage.set(filteredBd)

    return Promise.resolve(true)
  }
}
