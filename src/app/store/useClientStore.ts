import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import clientService, {
  enumClientStatus,
  type iClient,
  type iCreateClientParams,
  type iGetAllClientsFilters,
  type iUpdateClientParams
} from '../services/ClientService'
import { useRoute } from 'vue-router'
import { useAuthStore } from './useAuthStore'

export const useClientStore = defineStore('client', () => {
  const route = useRoute()
  const authStore = storeToRefs(useAuthStore())

  const filters = ref<iGetAllClientsFilters>({
    status: (route.query.status as enumClientStatus) || enumClientStatus.ACTIVE,
    firstName: route.query.firstName?.toString(),
    document: route.query.document?.toString()
  })

  const queryClient = useQueryClient()

  const {
    data: clients,
    isLoading,
    isRefetching
  } = useQuery({
    queryKey: ['clients'],
    queryFn: clientService.getAll,
    enabled: authStore.accessToken.value,
    staleTime: Infinity
  })

  const clientsFiltered = computed(() => {
    return clients.value?.reduce((acc, value) => {
      let hasFirstName = true
      let hasDocument = true
      let hasStatus = true

      if (filters.value.firstName) {
        const name = `${value.firstName} ${value.lastName}`
        hasFirstName = name
          .toLocaleLowerCase()
          .includes(filters.value.firstName.toLocaleLowerCase())
      }
      if (filters.value.document) {
        hasDocument = value.document.startsWith(filters.value.document)
      }
      if (filters.value.status !== enumClientStatus.ALL) {
        hasStatus = filters.value.status === value.status
      }

      if (hasFirstName && hasDocument && hasStatus) {
        acc.push(value)
      }
      return acc
    }, [] as iClient[])
  })

  const { mutateAsync: createMutation, isPending: createLoading } = useMutation({
    mutationFn: clientService.create
  })
  const { mutateAsync: updateMutation, isPending: updateLoading } = useMutation({
    mutationFn: clientService.update
  })

  const createClient = (values: iCreateClientParams) => {
    return createMutation(values).then(invalidateClientsQuery)
  }

  const invalidateClientsQuery = () => {
    return queryClient.invalidateQueries({ queryKey: ['clients'] })
  }

  const updateClient = (id: number, values: Omit<iUpdateClientParams, 'id'>) => {
    return updateMutation({
      ...values,
      id
    }).then(invalidateClientsQuery)
  }

  return {
    clients: clientsFiltered,
    clientsAll: clients,
    filters,
    isLoading,
    isRefetching,
    createLoading,
    updateLoading,
    createClient,
    updateClient
  }
})
