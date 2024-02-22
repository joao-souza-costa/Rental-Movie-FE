<template>
  <div class="relative">
    <label
      class="absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none"
      :class="[
        value && 'text-xs left-[13px] top-2 transition-all translate-y-0 text',
        errorMessage && '!text-red-900 top-1/3'
      ]"
    >
      {{ placeholder }}
    </label>
    <SelectRoot @update:model-value="inputChange" :model-value="value">
      <SelectTrigger
        class="relative bg-white w-full rounded-lg border border-gray-500 px-3 h-[55px] text-gray-800 outline-none focus:border-gray-800 flex items-center transition-all pt-4"
        :class="[errorMessage && '!border-red-900 text-red-900']"
        aria-label="Customise options"
      >
        <SelectValue />
        <SelectIcon class="absolute right-3 bottom-3">
          <ChevronDownIcon
            class="w-6 h-6 text-gray-800"
            :class="[errorMessage && '!border-red-900 text-red-900']"
          />
        </SelectIcon>
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          class="z-[99] min-w-[160px] bg-white rounded rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]"
          :side-offset="5"
        >
          <SelectScrollUpButton
            class="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default"
          >
          </SelectScrollUpButton>

          <SelectViewport class="p-2">
            <SelectItem
              v-for="option in options"
              :key="option.value"
              class="p-2 text-gray-800 text-sm data-[state=checked]:font-bold data-[highlighted]:bg-gray-50 cursor-pointer outline-none rounded-lg transition-colors"
              :value="option.value"
            >
              <SelectItemText>
                {{ option.label }}
              </SelectItemText>
            </SelectItem>
          </SelectViewport>

          <SelectScrollDownButton
            class="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default"
          >
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    <base-input-error :error-message="errorMessage" />
  </div>
</template>

<script setup lang="ts">
import { toRef, watch } from 'vue'
import BaseInputError from './BaseInputError.vue'

import {
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectViewport
} from 'radix-vue'
import ChevronDownIcon from '@/assets/icons/ChevronDownIcon.vue'
import { useField } from 'vee-validate'

interface tProps{
  initialValue?: string
  name: string
  errorMessage?: string
  options: {
    value: string
    label: string
  }[]
  placeholder: string
}

const props = defineProps<tProps>()
const emit = defineEmits<{ change: [v: string] }>()
const name = toRef(props, 'name')

const { handleChange, value, errorMessage } = useField(name, undefined, {
  initialValue: props.initialValue
})
watch(props, (v) => v.initialValue && handleChange(v.initialValue))

const inputChange = (v: string) => {
  emit('change', v)
  handleChange(v)
}
</script>
