<template>
  <div class="relative w-full">
    <input
      class="bg-white w-full rounded-lg border border-gray-500 px-3 h-[55px] text-gray-800 pt-4 peer placeholder-shown:pt-0 outline-none focus:border-gray-800 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:text-opacity-60"
      :class="[errorMessage && '!border-red-900 text-red-900', $attrs.class]"
      :name="inputId"
      :disabled="disabled"
      :id="inputId"
      :type="type"
      :value="value"
      @input="inputChange"
      @blur="handleBlur"
      placeholder=" "
    />

    <base-input-error :error-message="errorMessage" />

    <label
      class="text-xs absolute left-[13px] top-1 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 transition-all peer-disabled:text-opacity-60"
      :class="[errorMessage && '!text-red-900']"
      :for="inputId"
    >
      {{ placeholder }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import BaseInputError from './BaseInputError.vue'
import { toRef, watch } from 'vue'

export interface iProps {
  initialValue?: string
  name: string
  type: string
  id: string
  placeholder: string
  disabled?: boolean
}

const props = defineProps<iProps>()
const emit = defineEmits<{
  change: [value: HTMLInputElement['value']]
}>()

const name = toRef(props, 'name')

const { errorMessage, handleBlur, handleChange, value } = useField(name, undefined, {
  initialValue: props.initialValue
})
const inputId = props.name ?? props.id

watch(props, (v) => handleChange(v.initialValue))

const inputChange = (v: Event) => {
  emit('change', (v.target as HTMLInputElement).value)
  handleChange(v)
}
</script>
