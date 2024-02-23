<template>
  <div>
    <BasePopover.Root :open="isOpen">
      <BasePopover.Trigger>
        <button
          type="button"
          class="relative bg-white w-full rounded-lg border text-start border-gray-500 px-3 pt-4 h-[55px] text-gray-800 outline-none focus:border-gray-800 transition-all"
          :class="[errorMessage && '!border-red-900 text-red-900']"
          @click="toggleOpen"
        >
          <label
            class="absolute pointer-events-none text-xs text-gray-700 left-[13px] top-1 transition-all"
            :class="[!formatValue && 'top-4 text-opacity-60 !text-base']"
          >
            {{ label }}
          </label>
          <span>{{ formatValue }}</span>
        </button>
      </BasePopover.Trigger>

      <BasePopover.Content class="w-80 text-red-400">
        <VueDatePicker
          :disabled="disabled"
          week-start="0"
          :model-value="datePickerValue"
          inline
          auto-apply
          :hide-navigation="['time', 'year', 'month']"
          month-name-format="long"
          menu-class-name="dp-custom-menu"
          calendar-cell-class-name="dp-custom-cell"
          locale="pt-BR"
          format="MM"
          :range="range"
          @update:model-value="toggleOpen"
        />
      </BasePopover.Content>
    </BasePopover.Root>

    <div v-if="errorMessage" class="flex gap-1 items-center mt-2 text-red-900">
      <CrossCircle />
      <span class="text-xs"> {{ errorMessage }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'

import VueDatePicker from '@vuepic/vue-datepicker'
import BasePopover from './Popover/BasePopover'
import { formatDate } from '@/app/utils/formatDate'
import CrossCircle from '@/assets/icons/CrossCircle.vue'
import { computed, ref, toRef } from 'vue'
import { useField } from 'vee-validate'

type iProps = {
  name: string
  disabled?: boolean
  range?: boolean
  label: string
}

const props = defineProps<iProps>()
const name = toRef(props, 'name')
const isOpen = ref<boolean>(false)

const normalValue = computed<Date>({
  get() {
    if (value.value) return new Date(value.value as string)
    return ''
  },
  set(v) {
    if (!(v instanceof Date)) return

    if (v.toISOString() === value.value) return setValue('')

    setValue(v.toISOString())
  }
})

const rangeValue = computed<string[]>({
  get() {
    return value.value as string[]
  },
  set(v) {
    v instanceof Array && setValue(v)
  }
})

const { errorMessage, value, setValue } = useField(name, undefined)

const datePickerValue = props.range ? rangeValue : normalValue

const toggleOpen = (v: any): void => {
  if (isOpen.value) datePickerValue.value = v
  isOpen.value = !isOpen.value
}

const formatValue = computed(() => {
  if (!datePickerValue.value) return

  if (props.range) {
    const [start, end] = datePickerValue.value as string[]

    return `${formatDate(start)} - ${formatDate(end)}`
  }

  return formatDate(datePickerValue.value)
})
</script>

<style>
.dp__theme_light {
  --dp-primary-color: rgb(8 127 91 / var(--tw-bg-opacity));
  --dp-icon-color: rgb(8 127 91 / var(--tw-bg-opacity));
  --dp-menu-border-color: #fff;
  --dp-disabled-color: rgb(73 80 87 / var(--tw-text-opacity));
  --dp-disabled-color-text: rgb(73 80 87 / var(--tw-text-opacity));
}

.dp__theme_light .dp__outer_menu_wrap {
  width: 100%;
}

.dp-custom-menu {
  border-radius: 16px;
}

.dp-custom-cell {
  border-radius: 50%;
}
</style>
