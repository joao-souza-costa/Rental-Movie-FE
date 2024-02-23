import { enumClientStatus } from '@/app/services/ClientService'
import { useClientStore } from '@/app/store/useClientStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import * as Yup from 'yup'

export function useMovieFormController() {
  const { clientsAll: clients } = storeToRefs(useClientStore())

  const schema = Yup.object().shape({
    client: Yup.object().required('Cliente é Obrigátorio'),
    name: Yup.string().required('Filme é obrigatório'),
    dates: Yup.array().of(Yup.string()),
    document: Yup.string().required('Documento é obrigatório')
  })

  const activeClients = computed(() => {
    return clients.value?.filter((client) => client.status === enumClientStatus.ACTIVE)
  })

  return {
    schema,
    clients: activeClients
  }
}
