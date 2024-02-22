import { useQuery } from '@tanstack/vue-query'
import { defineStore } from 'pinia'
import { useAuthStore } from './useAuthStore'
import movieService from '../services/MovieService'
import { type iMovieGetallParams } from '@/app/services/MovieService'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useMovieStore = defineStore('movies', () => {
  const authStore = useAuthStore()
  const route = useRoute()

  const filters = ref<iMovieGetallParams>({
    title: 'Filmes',
    page: '1',
    year: ''
  })

  watch(
    () => route.query,
    (v) => {
      v.title && (filters.value.title = String(v.title))
      v.page && (filters.value.page = String(v.page))
      v.year && (filters.value.year = String(v.year))
    },
    { deep: true, immediate: true }
  )

  const {
    data: movies,
    refetch,
    isLoading,
    isRefetching
  } = useQuery({
    queryKey: ['movie'],
    queryFn: async () => movieService.getAll(filters.value),
    enabled: authStore.accessToken,
    staleTime: Infinity
  })

  watch(filters.value, () => refetch(), { deep: true })

  return {
    movies,
    filters,
    isLoading,
    isRefetching
  }
})
