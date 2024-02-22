import * as Yup from 'yup'
import locationService from '@/app/services/LocationService'
import { useForm } from 'vee-validate'
import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'
import useDebounce from '@/app/utils/useDebounce'

export function useClientFormController() {
  const schema = Yup.object().shape({
    firstName: Yup.string().required('Nome é obrigatório'),
    lastName: Yup.string().required(' Sobrenome é obrigatório'),
    document: Yup.string().required('CPF é obrigatório'),
    email: Yup.string().required(' Email é obrigatório'),
    cellphone: Yup.string().required(' Celular é obrigatório'),
    cep: Yup.string().length(8, 'Cep precisa ter 8 digitos ').required('CEP é obrigatório'),
    street: Yup.string().required('Logradouro é obrigatório'),
    neighborhood: Yup.string().required('Bairro é obrigatório'),
    city: Yup.string().required('Cidade é obrigatório'),
    state: Yup.string().required(' Estados é obrigatório')
  })

  const { handleSubmit, values } = useForm({
    validationSchema: schema
  })

  const {
    data: address,
    isLoading,
    isRefetching,
    refetch
  } = useQuery({
    queryKey: ['cep', values.cep],
    queryFn: async () => locationService.getAddressBasedInCep(values.cep),
    enabled: Boolean(values.cep),
    staleTime: 1,
    gcTime: 1
  })

  watch(
    () => values.cep,
    useDebounce((v) => v?.length === 8 && refetch())
  )

  return {
    address,
    schema,
    handleSubmit,
    isLoading,
    isRefetching
  }
}
