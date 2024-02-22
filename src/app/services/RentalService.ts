import { clientsKey } from '../constants/localStorageKeys'
import { useAuthStore } from '../store/useAuthStore'
import useLocalStorage from '../utils/useLocalStorage'
import type { iClient } from './ClientService'

const clientsStorage = useLocalStorage(clientsKey)

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

export interface iRental extends iRentalMovie {
  clientId: number
  clientName: string
}

export interface iRentalMovie {
  id: number
  name: string
  user: string
  status: enumRentalStatus
  startDate: string
  deliveryDate: string
  clientName?: string
}

export interface iGetAllParams {
  clientName?: string
  deliveryDate?: string
  startDate?: string
}

const handleFilters = (filters: iGetAllParams) => {
  return (acc: iRentalMovie[], client: iClient) => {
    let hasClientName = true
    let isAfterStartDate = true
    let isBeforeDeliveryDate = true
    const clientName = `${client.firstName} ${client.lastName}`

    const hasRental = client.rentals?.find((rent) => rent.status === enumRentalStatus.RENTED)

    if (hasRental) {
      if (filters.clientName) {
        hasClientName = clientName
          .toLocaleLowerCase()
          .includes(filters.clientName.toLocaleLowerCase())
      }

      if (filters.startDate) {
        isAfterStartDate = setMidnight(hasRental.startDate) === setMidnight(filters.startDate)
      }
      if (filters.deliveryDate) {
        isBeforeDeliveryDate =
          setMidnight(hasRental.deliveryDate) === setMidnight(filters.deliveryDate)
      }

      if (hasClientName && (isAfterStartDate || isBeforeDeliveryDate)) {
        acc.push({ clientName, ...hasRental })
      }
    }
    return acc
  }
}

const setMidnight = (value: string): number => {
  return new Date(value).setHours(0, 0, 0, 0)
}

export default {
  getAll: async (filters: iGetAllParams) => {
    const clientBd = clientsStorage.get() as iClient[] | null
    return clientBd?.reduce(handleFilters(filters), [] as iRentalMovie[])
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
