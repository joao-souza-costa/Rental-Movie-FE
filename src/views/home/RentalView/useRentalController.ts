import { MOVIE_PAGE } from '@/app/constants/route'
import type { iRental } from '@/app/services/RentalService'
import { useRentalStore } from '@/app/store/useRentalStore'
import { useModals } from '@/app/utils/useModals'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

export function useRentalController() {
  const router = useRouter()
  const rentalStore = useRentalStore()

  const { isOpenModal, toggleModal } = useModals<iRental>()

  const { rentals, filters } = storeToRefs(rentalStore)

  const openMoviesPage = () => {
    router.push(MOVIE_PAGE)
  }

  const { values } = useForm({
    initialValues: {
      startDate: filters.value.startDate,
      clientName: filters.value.clientName,
      endDate: filters.value.deliveryDate
    }
  })

  watch(
    () => values,
    (v) => {
      filters.value.clientName = v.clientName
      filters.value.startDate = v.startDate
      filters.value.deliveryDate = v.endDate
      router.push({ query: { ...filters.value } })
    },
    { deep: true }
  )

  return {
    data: rentals,
    openMoviesPage,
    isOpenModal,
    toggleModal
  }
}
