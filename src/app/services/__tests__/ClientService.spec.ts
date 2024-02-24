import { describe, it, expect } from 'vitest'

import clientsMocks from '@/mocks/clientsMocks'
import clientService, { enumClientStatus, type iClient } from '../ClientService'

describe('RentalService filters', () => {
  it('Should returns all clients', () => {
    const list = clientsMocks.clients?.reduce(
      clientService.handleFilter({
        document: undefined,
        name: undefined,
        status: enumClientStatus.ALL
      }),
      [] as iClient[]
    )
    expect(list).toStrictEqual(clientsMocks.clients)
  })

  it('Should returns clients that name includes "Taylor"', () => {
    const list = clientsMocks.clients?.reduce(
      clientService.handleFilter({
        document: undefined,
        name: 'Taylor',
        status: enumClientStatus.ALL
      }),
      [] as iClient[]
    )
    expect(list).toStrictEqual([
      {
        firstName: 'Sophia',
        lastName: 'Taylor',
        document: '98765432101',
        email: 'sophia.taylor@example.com',
        cellphone: '(987) 654-3210',
        cep: '21098765',
        street: 'Rua Example',
        neighborhood: 'Exampleville',
        city: 'Salvador',
        state: 'BA',
        id: 0.9012345678901234,
        status: 'INACTIVE',
        rentals: [
          {
            id: 0.1234567890123456,
            user: 'Ana Santos',
            status: 'RENTED',
            name: 'A Star Is Born',
            startDate: '2024-02-24T12:00:00.000Z',
            deliveryDate: '2024-03-02T12:00:00.000Z'
          }
        ]
      },
      {
        firstName: 'Ava',
        lastName: 'Taylor',
        document: '36925814700',
        email: 'ava.taylor@example.com',
        cellphone: '(369) 258-1470',
        cep: '54321098',
        street: 'Rua Mock',
        neighborhood: 'Mockton',
        city: 'João Pessoa',
        state: 'PB',
        id: 0.2109876543210987,
        status: 'ACTIVE',
        rentals: []
      }
    ])
  })
  
  it('Should returns clients that document startsWith "95"', () => {
    const list = clientsMocks.clients?.reduce(
      clientService.handleFilter({
        document: '95',
        name: undefined,
        status: enumClientStatus.ALL
      }),
      [] as iClient[]
    )
    expect(list).toStrictEqual([
      {
        firstName: 'Amelia',
        lastName: 'Johnson',
        document: '95175346800',
        email: 'amelia.johnson@example.com',
        cellphone: '(951) 753-4680',
        cep: '32109876',
        street: 'Rua Example',
        neighborhood: 'Exampletown',
        city: 'Belém',
        state: 'PA',
        id: 0.7654321098765432,
        status: 'ACTIVE',
        rentals: []
      }
    ])
  })
})
