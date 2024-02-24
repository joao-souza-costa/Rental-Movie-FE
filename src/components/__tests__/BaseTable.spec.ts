import { describe, it, expect } from 'vitest'

import BaseTable from '../BaseTable/BaseTable'
import { mount } from '@vue/test-utils'

describe('BaseTable', () => {
  it('Should renders properly', () => {
    const wrapper = mount(BaseTable.Root)
    expect(wrapper.html()).toBeTruthy()
  })

  it('Should Show spinner if isLoading is true', () => {
    const wrapper = mount(BaseTable.Root, { props: { isLoading: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Should Show empty image if isLoading is false but list length is 0', () => {
    const wrapper = mount(BaseTable.Root, { props: { isLoading: false, list: [] } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Should Show list if isLoading is false but list length more than 0', () => {
    const wrapper = mount(BaseTable.Root, { props: { isLoading: false, list: [{}] } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
