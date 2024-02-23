import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import rentalService, {
  type iAddRentalStatusParams,
  type iGetAllParams,
  type iUpdateRentalStatusParams
} from '../services/RentalService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useAuthStore } from './useAuthStore'

export const useRentalStore = defineStore('rental', () => {
  const route = useRoute()
  const queryClient = useQueryClient()
  const authStore = storeToRefs(useAuthStore())

  const handleEndDate = (date: Date) => new Date(date.setDate(date.getDate() + 7)).toISOString()

  const filters = ref<iGetAllParams>({
    startDate: route.query.startDate?.toString(),
    deliveryDate: route.query.deliveryDate?.toString(),
    clientName: route.query.clientName?.toString()
  })

  const {
    data: rentals,
    isLoading,
    isRefetching
  } = useQuery({
    queryKey: ['rental', filters.value],
    queryFn: async () => rentalService.getAll(filters.value),
    enabled: authStore.accessToken.value,
    staleTime: Infinity
  })

  const invalidateRentalQuery = () => {
    return queryClient.invalidateQueries({ queryKey: ['rental'] })
  }

  const { mutateAsync: createRentalMutation, isPending: createRentalLoading } = useMutation({
    mutationFn: rentalService.addRental
  })

  const { mutateAsync: updateRentalStatusMutation, isPending: updateRentalStatusLoading } =
    useMutation({
      mutationFn: rentalService.updateRentalStatus
    })

  const updateRentalStatus = (values: iUpdateRentalStatusParams) => {
    return updateRentalStatusMutation(values).then(invalidateRentalQuery)
  }
  const createRental = (values: iAddRentalStatusParams) => {
    return createRentalMutation(values).then(invalidateRentalQuery)
  }

  return {
    rentals,
    isLoading,
    isRefetching,
    filters,
    createRentalLoading,
    updateRentalStatusLoading,
    updateRentalStatus,
    createRental
  }
})
