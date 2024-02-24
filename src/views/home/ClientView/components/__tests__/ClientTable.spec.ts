import { describe, it, expect, vi } from 'vitest'
import ClientTable from '../ClientTable.vue'
import { mount } from '@vue/test-utils'
import clientsMocks from '@/mocks/clientsMocks'

describe('ClientTable', () => {
  it('Should render properly', () => {
    const wrapper = mount(ClientTable, { props: { list: clientsMocks.clients, isLoading: false } })
    expect(wrapper.html()).toBeTruthy()
  })

  it('Should emit a client', () => {
    const wrapper = mount(ClientTable, { props: { list: clientsMocks.clients, isLoading: false } })

    const cell = wrapper.find('[data-test-id="table-cell"]')
    cell.trigger('click')

    const selectedClient = wrapper.emitted().selectedClient

    expect(selectedClient[0]).toStrictEqual([{ key: 0, ...clientsMocks.clients[0] }])
  })
})
