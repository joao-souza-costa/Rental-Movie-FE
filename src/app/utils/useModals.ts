import { reactive } from 'vue'

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

  const toggleModal = (type: 'CREATE' | 'EDIT', item?: T): void => {
    if (type === 'EDIT' && item) isOpenModal.EDIT_ITEM = item as T
    isOpenModal[type] = !isOpenModal[type]
  }
  return {
    toggleModal,
    isOpenModal
  }
}
