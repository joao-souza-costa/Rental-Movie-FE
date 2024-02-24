import { describe, it, expect, vi } from 'vitest'
import MovieTable from '../MovielTable.vue'
import { mount } from '@vue/test-utils'
import movieMocks from '@/mocks/movieMocks'

 

describe('MovieTable', () => {
  it('Should render properly', () => {
    const wrapper = mount(MovieTable, { props: { list: movieMocks, isLoading: false } })
    expect(wrapper.html()).toBeTruthy()
  })

  it('Should emit a movie', () => {
    const wrapper = mount(MovieTable, { props: { list: movieMocks, isLoading: false } })
    const cell = wrapper.find('[data-test-id="table-cell"]')
    cell.trigger('click')

    const selectedMovie = wrapper.emitted().selectMovie
    expect(selectedMovie[0]).toStrictEqual([{ key: 0, ...movieMocks[0] }])
  })
})
