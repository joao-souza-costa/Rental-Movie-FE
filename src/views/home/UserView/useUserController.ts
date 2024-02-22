import type { iUser } from '@/app/services/UserService'
import { useUserStore } from '@/app/store/useUserStore'
import { useModals } from '@/app/utils/useModals'
import { storeToRefs } from 'pinia'

export function useUserController() {
  const { users, isLoading, isRefetching } = storeToRefs(useUserStore())
  const { isOpenModal, toggleModal } = useModals<iUser>()

  return {
    users,
    isOpenModal,
    isLoading,
    isRefetching,
    toggleModal
  }
}
