import { defineComponent } from 'vue'
import emptyState from '@/assets/empty-state.svg'
import BaseSpinner from '../BaseSpinner.vue'

const BaseTable = defineComponent({
  props: { isLoading: Boolean, notFoundDescription: String, list: Array },
  components: {
    BaseSpinner
  },
  setup() {
    return {
      emptyState
    }
  },
  template: /* html*/ `
  <div class="relative border-gray-300 border w-full overflow-y-auto scrollbar h-[500px]">
    <div class="h-full flex items-center justify-center" v-if="isLoading">
      <base-spinner />
    </div>

    <div
      class="h-full flex flex-col items-center justify-center"
      v-if="!isLoading && !list?.length"
    >
      <img :src="emptyState" alt="empty state" />
      <p class="text-gray-700 text-center">{{ notFoundDescription }}</p>
    </div>

    <div v-if="!isLoading && list?.length">
      <slot name="header" />

      <slot v-for="item in list" :key="item" v-bind="item" />
    </div>
  </div>`
})

const BaseHeader = defineComponent({
  template: /* html*/ `
  <header class="sticky p-5 top-0 flex justify-between border border-b-gray-300 bg-white">
  <slot />
</header>`
})

const BaseCell = defineComponent({
  template: /* html*/ ` 
  <div
  class="py-3 px-5 cursor-pointer hover:bg-gray-100 flex items-center justify-between border border-b-gray-300 transition-all"
>
  <slot />
</div>`
})

export default {
  Root: BaseTable,
  Header: BaseHeader,
  Cell: BaseCell
}
