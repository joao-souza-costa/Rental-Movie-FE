import { type enumClientStatus, type iClient } from '@/app/services/ClientService'
import { useClientStore } from '@/app/store/useClientStore'
import useDebounce from '@/app/utils/useDebounce'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export function useClientController() {
  const { clients, isLoading, isRefetching, filters } = storeToRefs(useClientStore())
  const router = useRouter()
  const isOpenModal = reactive<{
    CREATE: boolean
    EDIT: boolean
    EDIT_CLIENT: iClient | undefined
  }>({
    CREATE: false,
    EDIT: false,
    EDIT_CLIENT: undefined
  })

  const toggleModal = (type: 'CREATE' | 'EDIT', client?: iClient): void => {
    if (type === 'EDIT' && client) isOpenModal.EDIT_CLIENT = client
    isOpenModal[type] = !isOpenModal[type]
  }

  const updateFilters = (
    filter: 'status' | 'firstName' | 'document',
    value: string | enumClientStatus | undefined
  ) => {
    filters.value[filter] = value
    router.push({ query: { ...filters.value } })
  }

  const handleUpdateFirstName = useDebounce((value: string) => {
    updateFilters('firstName', value)
  })

  const handleUpdateStatus = (value: string) => {
    updateFilters('status', value as enumClientStatus)
  }
  const handleUpdateDocument = useDebounce((value: string): void => {
    updateFilters('document', value)
  })

  return {
    clients,
    isOpenModal,
    isLoading,
    isRefetching,
    filters,
    toggleModal,
    handleUpdateFirstName,
    handleUpdateStatus,
    handleUpdateDocument
  }
}
