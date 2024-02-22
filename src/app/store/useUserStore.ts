import { defineStore, storeToRefs } from 'pinia'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import userService from '../services/UserService'
import { useAuthStore } from './useAuthStore'

export const useUserStore = defineStore('user', () => {
  const { accessToken } = storeToRefs(useAuthStore())
  const queryUser = useQueryClient()

  const {
    data: users,
    isLoading,
    isRefetching
  } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    enabled: accessToken,
    staleTime: Infinity
  })

  const { mutateAsync: createMutation, isPending: createLoading } = useMutation({
    mutationFn: userService.create
  })

  const { mutateAsync: updateMutation, isPending: updateLoading } = useMutation({
    mutationFn: userService.update
  })

  const invalidateUsersQuery = () => {
    return queryUser.invalidateQueries({ queryKey: ['users'] })
  }

  const createUser = (values: any) => {
    return createMutation(values).then(invalidateUsersQuery)
  }

  const updateUser = (id: number, values: any) => {
    return updateMutation({
      ...values,
      id
    }).then(invalidateUsersQuery)
  }

  return {
    users,
    isLoading,
    isRefetching,
    createLoading,
    updateLoading,
    createUser,
    updateUser
  }
})
