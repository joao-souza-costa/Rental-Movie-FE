import { reactive, type UnwrapRef } from 'vue'

export function useModals<T>() {
  const isOpenModal = reactive<{
    CREATE: boolean
    EDIT: boolean
    EDIT_ITEM: T | undefined
  }>({
    CREATE: false,
    EDIT: false,
    EDIT_ITEM: undefined
  })

  const toggleModal = (type: 'CREATE' | 'EDIT', client?: T): void => {
    if (type === 'EDIT' && client) isOpenModal.EDIT_ITEM = client as UnwrapRef<T>
    isOpenModal[type] = !isOpenModal[type]
  }
  return {
    toggleModal,
    isOpenModal
  }
}
