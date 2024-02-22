import AuthService from '@/app/services/AuthService'
import type { iSignInParams } from '@/app/services/AuthService'
import { useMutation } from '@tanstack/vue-query'
import * as Yup from 'yup'
import { useAuthStore } from '@/app/store/useAuthStore'
import { toast } from '@/app/utils/toast'

export function useLoginController() {
  const authStore = useAuthStore()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: iSignInParams) => {
      return AuthService.signIn(values)
    }
  })

  async function onSubmit(values: iSignInParams) {
    return mutateAsync(values)
      .then((token: number) => {
        authStore.signin(token)
      })
      .catch((e: any) => toast.error(e))
  }

  const schema = Yup.object().shape({
    email: Yup.string().email('Informe um email válido').required('Email é obrigatório'),
    password: Yup.string()
      .min(8, 'Senha deve ter pelo menos 8 digitos')
      .required('Senha é obrigatória')
  })

  return {
    schema,
    onSubmit,
    isLoading:isPending
  }
}
