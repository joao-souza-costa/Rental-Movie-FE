import { MOVIE_PAGE } from '@/app/constants/route'
import { useRentalStore } from '@/app/store/useRentalStore'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'

export function useRentalController() {
  const router = useRouter()
  const rentalStore = useRentalStore()

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
      dates: getDate()
    }
  })

  return {
    data: rentalArray,
    openMoviesPage
  }
}
