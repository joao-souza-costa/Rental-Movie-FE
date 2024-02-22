import { MOVIE_PAGE } from '@/app/constants/route'
import { useRentalStore } from '@/app/store/useRentalStore'
import { useModals } from '@/app/utils/useModals'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

export function useRentalController() {
  const router = useRouter()
  const rentalStore = useRentalStore()

  const { isOpenModal, toggleModal } = useModals()

  const { rentalArray, filters } = storeToRefs(rentalStore)

  const openMoviesPage = () => {
    router.push({ path: MOVIE_PAGE.path, name: MOVIE_PAGE.name, query: { fromAction: 'true' } })
  }
  const getDate = () => {
    const startDate = new Date()
    const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
    return [startDate, endDate]
  }
  const { values } = useForm({
    initialValues: {
      dates: getDate(),
      clientName: ''
    }
  })

  watch(
    () => values,
    (v) => {
      filters.value.clientName = v.clientName
    },
    { deep: true }
  )

  return {
    data: rentalArray,
    openMoviesPage,
    isOpenModal,
    toggleModal
  }
}
