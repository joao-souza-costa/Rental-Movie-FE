import { httpClient } from './Client'

const client = httpClient('https://viacep.com.br/ws')

export interface iAddress {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export default {
  getAddressBasedInCep: async (cep: string) => {
    const { data } = await client.get<iAddress>(`/${cep}/json`)
    return data
  }
}
