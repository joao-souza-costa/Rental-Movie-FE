import type { iMovie } from '@/app/services/MovieService'
import { useMovieStore } from '@/app/store/useMovieStore'
import useDebounce from '@/app/utils/useDebounce'
import { useModals } from '@/app/utils/useModals'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export function useMovieController() {
  const movieStore = useMovieStore()
  const router = useRouter()
  const { isOpenModal, toggleModal } = useModals<iMovie>()
  const { movies, filters, isLoading, isRefetching } = storeToRefs(movieStore)

  const updateFilters = (filter: 'title' | 'year' | 'page', value: string) => {
    filters.value[filter] = value
    router.push({ query: { ...filters.value } })
  }

  const handleUpdateTitle = useDebounce((value: unknown) => {
    updateFilters('title', String(value).trim())
    updateFilters('page', '1')
  })

  const handleUpdateYear = useDebounce((value: unknown) => {
    updateFilters('year', String(value).trim())
    updateFilters('page', '1')
  })
  const handleUpdatePage = (value: number): void => {
    const pageAsNumber = Number(filters.value.page) + value
    if (pageAsNumber === 0) return
    updateFilters('page', String(pageAsNumber).trim())
  }

  return {
    data: movies,
    filters,
    isLoading,
    isRefetching,
    isOpenModal,
    toggleModal,
    handleUpdateTitle,
    handleUpdateYear,
    handleUpdatePage
  }
}
