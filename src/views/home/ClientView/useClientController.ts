import { type enumClientStatus, type iClient } from '@/app/services/ClientService'
import { useClientStore } from '@/app/store/useClientStore'
import useDebounce from '@/app/utils/useDebounce'
import { useModals } from '@/app/utils/useModals'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export function useClientController() {
  const { clients, isLoading, isRefetching, filters } = storeToRefs(useClientStore())
  const router = useRouter()

  const { isOpenModal, toggleModal } = useModals<iClient>()

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
