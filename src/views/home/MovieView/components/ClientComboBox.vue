<template>
  <div class="w-full">
    <ComboboxRoot
      :model-value="value"
      :displayValue="(v) => `${v.firstName} ${v.lastName}`"
      @update:model-value="handleChange"
      :filter-function="filterFunction"
      class="relative w-full"
    >
      <ComboboxAnchor
        class="relative bg-white w-full rounded-lg border border-gray-500 px-3 h-[55px] text-gray-800 outline-none focus:border-gray-800 flex items-center transition-all pt-1"
        :class="[errorMessage && ' !border-red-900 text-red-900']"
      >
        <ComboboxInput
          class="w-full outline-none text-grass11 h-full selection:bg-grass5 placeholder:text-gray-800"
          :class="[errorMessage ? 'placeholder:text-red-900' : 'placeholder:text-gray-800']"
          placeholder="Nome do Cliente"
        />

        <ComboboxTrigger class="absolute right-3 bottom-3">
          <ChevronDownIcon
            class="w-6 h-6 text-gray-800"
            :class="[errorMessage && ' text-red-900']"
          />
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxContent
        class="w-full absolute z-[99] min-w-[160px] bg-white rounded rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]"
      >
        <ComboboxViewport class="p-[5px]">
          <ComboboxGroup>
            <ComboboxItem
              v-for="(option, index) in options"
              :key="index"
              class="p-2 text-gray-800 text-sm data-[state=checked]:font-bold data-[highlighted]:bg-gray-50 cursor-pointer outline-none rounded-lg transition-colors"
              :value="option"
            >
              <slot name="label" v-bind="{ ...option }" />
            </ComboboxItem>
            <ComboboxSeparator class="h-[1px] bg-grass6 m-[5px]" />
          </ComboboxGroup>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxRoot>

    <base-input-error :error-message="errorMessage" />
  </div>
</template>

<script setup lang="ts">
import ChevronDownIcon from '@/assets/icons/ChevronDownIcon.vue'
import BaseInputError from '@/components/BaseInputError.vue'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxViewport
} from 'radix-vue'
import { useField } from 'vee-validate'

const props = defineProps<{
  options: any
  name: string
}>()

const { value, handleChange, errorMessage } = useField(props.name, undefined)

function filterFunction(list: any[], inputText: string) {
  return list.filter((person) => {
    const name = `${person.firstName} ${person.lastName}`
    return name.toLowerCase().includes(inputText.toLowerCase())
  })
}
</script>
