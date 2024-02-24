import { describe, it, expect } from 'vitest'

import rentalService, { type iRental } from '../RentalService'
import clientsMocks from '@/mocks/clientsMocks'
import rentalsMocks from '@/mocks/rentalMocks'

describe('RentalService filters', () => {
  it('Should returns all rentals with status RENTED', () => {
    const list = clientsMocks.clientsWithRentals?.reduce(
      rentalService.handleFilters({ clientName: '', deliveryDate: '', startDate: '' }),
      [] as iRental[]
    )
    expect(list).toStrictEqual(rentalsMocks)
  })

  it('Should returns rentals with status RENTED and name includes "B"', () => {
    const list = clientsMocks.clientsWithRentals?.reduce(
      rentalService.handleFilters({ clientName: 'B', deliveryDate: '', startDate: '' }),
      [] as iRental[]
    )

    expect(list).toStrictEqual([
      {
        clientId: 0.01599638559269878,
        clientName: 'Beyonce Pereira',
        id: 0.01599232453070787,
        user: 'João Souza',
        status: 'RENTED',
        name: 'Portraits filmés',
        startDate: '2024-03-04T07:08:00.000Z',
        deliveryDate: '2024-03-19T07:08:00.000Z'
      }
    ])
  })

  it('Should returns rentals with status RENTED and deliveryDate is equal 01/03/2024', () => {
    const list = clientsMocks.clientsWithRentals?.reduce(
      rentalService.handleFilters({
        clientName: '',
        deliveryDate: '2024-03-01T06:52:22.589Z',
        startDate: ''
      }),
      [] as iRental[]
    )

    expect(list).toStrictEqual([
      {
        clientId: 0.5856043220908693,
        clientName: 'Lady Gaga',
        id: 0.04217768470165306,
        user: 'João Souza',
        status: 'RENTED',
        name: 'Os Filmes Que Não Fiz',
        startDate: '2024-02-23T06:52:22.589Z',
        deliveryDate: '2024-03-01T06:52:22.589Z'
      },
      {
        clientId: 0.16917129576745027,
        clientName: 'Jay - Z',
        id: 0.7886391669309969,
        user: 'João Souza',
        status: 'RENTED',
        name: 'A Star Is Born',
        startDate: '2024-02-23T06:56:22.185Z',
        deliveryDate: '2024-03-01T06:56:22.185Z'
      }
    ])
  })

  it('Should returns rentals with status RENTED and startDate is equal 23/02/2024', () => {
    const list = clientsMocks.clientsWithRentals?.reduce(
      rentalService.handleFilters({
        clientName: '',
        deliveryDate: '',
        startDate: '2024-02-23T06:52:22.589Z'
      }),
      [] as iRental[]
    )

    expect(list).toStrictEqual([
      {
        clientId: 0.5856043220908693,
        clientName: 'Lady Gaga',
        id: 0.04217768470165306,
        user: 'João Souza',
        status: 'RENTED',
        name: 'Os Filmes Que Não Fiz',
        startDate: '2024-02-23T06:52:22.589Z',
        deliveryDate: '2024-03-01T06:52:22.589Z'
      },
      {
        clientId: 0.16917129576745027,
        clientName: 'Jay - Z',
        id: 0.7886391669309969,
        user: 'João Souza',
        status: 'RENTED',
        name: 'A Star Is Born',
        startDate: '2024-02-23T06:56:22.185Z',
        deliveryDate: '2024-03-01T06:56:22.185Z'
      }
    ])
  })

  it('Should returns rentals with status RENTED, startDate is equal 23/02/2024 and deliveryDate is equal 02/03/2024', () => {
    const list = clientsMocks.clientsWithRentals?.reduce(
      rentalService.handleFilters({
        clientName: '',
        deliveryDate: '2024-03-02T12:00:00.000Z',
        startDate: '2024-02-23T06:52:22.589Z'
      }),
      [] as iRental[]
    )

    expect(list).toStrictEqual([
      {
        clientId: 0.5856043220908693,
        clientName: 'Lady Gaga',
        id: 0.04217768470165306,
        user: 'João Souza',
        status: 'RENTED',
        name: 'Os Filmes Que Não Fiz',
        startDate: '2024-02-23T06:52:22.589Z',
        deliveryDate: '2024-03-01T06:52:22.589Z'
      },
      {
        clientId: 0.16917129576745027,
        clientName: 'Jay - Z',
        id: 0.7886391669309969,
        user: 'João Souza',
        status: 'RENTED',
        name: 'A Star Is Born',
        startDate: '2024-02-23T06:56:22.185Z',
        deliveryDate: '2024-03-01T06:56:22.185Z'
      },
      {
        clientId: 0.9012345678901234,
        clientName: 'Sophia Taylor',
        id: 0.1234567890123456,
        user: 'Ana Santos',
        status: 'RENTED',
        name: 'A Star Is Born',
        startDate: '2024-02-24T12:00:00.000Z',
        deliveryDate: '2024-03-02T12:00:00.000Z'
      }
    ])
  })

  it('Should returns rentals with status RENTED, name includes "L", startDate is equal 23/02/2024 and deliveryDate is equal 02/03/2024', () => {
    const list = clientsMocks.clientsWithRentals?.reduce(
      rentalService.handleFilters({
        clientName: 'L',
        deliveryDate: '2024-03-02T12:00:00.000Z',
        startDate: '2024-02-23T06:52:22.589Z'
      }),
      [] as iRental[]
    )

    expect(list).toStrictEqual([
      {
        clientId: 0.5856043220908693,
        clientName: 'Lady Gaga',
        id: 0.04217768470165306,
        user: 'João Souza',
        status: 'RENTED',
        name: 'Os Filmes Que Não Fiz',
        startDate: '2024-02-23T06:52:22.589Z',
        deliveryDate: '2024-03-01T06:52:22.589Z'
      },
      {
        clientId: 0.9012345678901234,
        clientName: 'Sophia Taylor',
        id: 0.1234567890123456,
        user: 'Ana Santos',
        status: 'RENTED',
        name: 'A Star Is Born',
        startDate: '2024-02-24T12:00:00.000Z',
        deliveryDate: '2024-03-02T12:00:00.000Z'
      }
    ])
  })
})
