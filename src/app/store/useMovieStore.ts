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
    title: route.query.title?.toString() || 'Filmes',
    page: route.query.page?.toString() || '1',
    year: route.query.year?.toString()
  })

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
