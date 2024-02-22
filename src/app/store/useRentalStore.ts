import { defineStore, storeToRefs } from 'pinia'
import { useClientStore } from './useClientStore'
import { computed, ref } from 'vue'
import { enumRentalStatus } from '../services/ClientService'
import { formatDate } from '../utils/formatDate'

export const useRentalStore = defineStore('rental', () => {
  const { clients } = storeToRefs(useClientStore())
  const filters = ref<{
    startDate?: Date
    deliveryDate?: Date
    clientName?: string
  }>({
    startDate: undefined,
    deliveryDate: undefined,
    clientName: undefined
  })

  const handleFilter = (value: any) => {
    let hasClientName = true

    if (filters.value.clientName) {
      const name = `${value.firstName} ${value.lastName}`
      hasClientName = name.includes(filters.value.clientName)
    }

    return hasClientName
  }

  const rentalArray = computed(() => {
    return clients.value?.reduce((acc, item) => {
      const hasRental = item.rentals?.find((rent) => rent.status === enumRentalStatus.RENTED)

      if (hasRental && handleFilter({ ...hasRental, ...item })) {
        acc.push({
          clientId: item.id,
          clientName: `${item.firstName} ${item.lastName}`,
          ...hasRental
        })
      }

      return acc
    }, [] as any)
  })

  return {
    rentalArray,
    filters
  }
})
