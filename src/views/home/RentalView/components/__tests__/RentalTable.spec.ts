import { describe, it, expect, vi } from 'vitest'
import RentalTable from '../RentalTable.vue'
import { mount } from '@vue/test-utils'

import rentalMocks from '@/mocks/rentalMocks'

describe('RentalTable', () => {
  it('Should render properly', () => {
    const wrapper = mount(RentalTable, { props: { list: rentalMocks, isLoading: false } })
    expect(wrapper.html()).toBeTruthy()
  })

  it('Should emit a rental', () => {
    const wrapper = mount(RentalTable, { props: { list: rentalMocks, isLoading: false } })
    const cell = wrapper.find('[data-test-id="table-cell"]')
    cell.trigger('click')

    const selectedRental = wrapper.emitted().selectRental
    expect(selectedRental[0]).toStrictEqual([{ key: 0, ...rentalMocks[0] }])
  })  
})
