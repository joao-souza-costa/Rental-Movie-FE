import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { loggedUserKey } from '../constants/localStorageKeys'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import clientService, {
  enumClientStatus,
  type iAddRentalStatusParams,
  type iGetAllClientsFilters,
  type iUpdateRentalStatusParams
} from '../services/ClientService'
import useLocalStorage from '../utils/useLocalStorage'
import { useRoute } from 'vue-router'

export const useClientStore = defineStore('client', () => {
  const accessToken = ref<boolean>(Boolean(useLocalStorage(loggedUserKey).get().id))
  const filters = ref<iGetAllClientsFilters>({
    status: enumClientStatus.ALL,
    firstName: '',
    document: ''
  })

  const queryClient = useQueryClient()

  const {
    data: clients,
    isLoading,
    isRefetching
  } = useQuery({
    queryKey: ['clients', filters.value],
    queryFn: async () => clientService.getAll(filters.value),
    enabled: accessToken,
    staleTime: Infinity
  })

  const { mutateAsync: createMutation, isPending: createLoading } = useMutation({
    mutationFn: clientService.create
  })
  const { mutateAsync: updateMutation, isPending: updateLoading } = useMutation({
    mutationFn: clientService.update
  })

  const { mutateAsync: createRentalMutation, isPending: createRentalLoading } = useMutation({
    mutationFn: clientService.addRental
  })

  const { mutateAsync: updateRentalStatusMutation, isPending: updateRentalStatusLoading } = useMutation(
    {
      mutationFn: clientService.updateRentalStatus
    }
  )

  const invalidateClientsQuery = () => {
    return queryClient.invalidateQueries({ queryKey: ['clients'] })
  }

  const createClient = (values: any) => {
    return createMutation(values).then(invalidateClientsQuery)
  }

  const createRental = (values: iAddRentalStatusParams) => {
    return createRentalMutation(values).then(invalidateClientsQuery)
  }

  const updateRentalStatus = (values: iUpdateRentalStatusParams) => {
    return updateRentalStatusMutation(values).then(invalidateClientsQuery)
  }

  const updateClient = (id: number, values: any) => {
    return updateMutation({
      ...values,
      id
    }).then(invalidateClientsQuery)
  }

  const route = useRoute()

  watch(
    () => route.query,
    (v) => {
      v.status
        ? (filters.value.status = String(v.status) as enumClientStatus)
        : (filters.value.status = enumClientStatus.ALL)

      v.firstName && (filters.value.firstName = String(v.firstName))
      v.document && (filters.value.document = String(v.document))
    },
    { deep: true, immediate: true }
  )

  return {
    clients,
    filters,
    isLoading,
    isRefetching,
    createLoading,
    updateLoading,
    createRentalLoading,
    createClient,
    updateClient,
    createRental,
    updateRentalStatus,
    updateRentalStatusLoading
  }
})
