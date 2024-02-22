import { useClientStore } from '@/app/store/useClientStore'
import { storeToRefs } from 'pinia'
import * as Yup from 'yup'

export function useMovieFormController() {
  const { clients } = storeToRefs(useClientStore())

  const schema = Yup.object().shape({
    client: Yup.object().required('Cliente é Obrigátorio'),
    name: Yup.string().required('Filme é obrigatório'),
    dates: Yup.array().of(Yup.string()),
    document: Yup.string().required('Documento é obrigatório')
  })

  return {
    schema,
    clients
  }
}
