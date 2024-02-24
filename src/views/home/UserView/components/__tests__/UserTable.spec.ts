import { describe, it, expect, vi } from 'vitest'
import UserTable from '../UserTable.vue'
import { mount } from '@vue/test-utils'

import usersMocks from '@/mocks/usersMocks'

describe('UserTable', () => {
  it('Should render properly', () => {
    const wrapper = mount(UserTable, { props: { list: usersMocks, isLoading: false } })
    expect(wrapper.html()).toBeTruthy()
  })

  it('Should emit a user', () => {
    const wrapper = mount(UserTable, { props: { list: usersMocks, isLoading: false } })
    const cell = wrapper.find('[data-test-id="table-cell"]')
    cell.trigger('click')

    const selectedUser = wrapper.emitted().selectedUser
    expect(selectedUser[0]).toStrictEqual([{ key: 0, ...usersMocks[0] }])
  })
})
