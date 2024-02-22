import { defineStore, storeToRefs } from 'pinia'
import { useClientStore } from './useClientStore'
import { computed, ref } from 'vue'
import { enumRentStatus } from '../services/ClientService'
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
    let hasStartDate = true
    let hasDeliveryDate = true
    let hasClientName = true

    if (filters.value.clientName) {
      const name = `${value.firstName} ${value.lastName}`
      hasClientName = name.includes(filters.value.clientName)
    }

    if (filters.value.deliveryDate) {
      hasDeliveryDate = new Date(value.deliveryDate) <= new Date(filters.value.deliveryDate)
    }

    if (filters.value.startDate) {
      hasStartDate = new Date(filters.value.startDate) <= new Date(value.startDate)
    }

    return hasClientName && hasDeliveryDate && hasStartDate
  }

  const rentalArray = computed(() => {
    return clients.value?.reduce((acc, item) => {
      const hasRent = item.rents?.find((rent) => rent.status === enumRentStatus.RENTED)

      if (hasRent && handleFilter({ ...hasRent, ...item })) {
        acc.push({
          name: hasRent.name,
          clientName: `${item.firstName} ${item.lastName}`,
          startDate: formatDate(hasRent.startDate),
          deliveryDate: formatDate(hasRent.deliveryDate),
          status: hasRent.status,
          user: hasRent.user
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
