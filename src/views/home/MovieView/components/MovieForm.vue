<template>
  <form @submit.prevent="onSubmit" class="mt-5 flex flex-col items-center gap-4">
    <base-input type="text" id="name" name="name" placeholder="Nome do filme" />

    <base-combo-box name="client" :options="clients">
      <template #label="{ firstName, lastName }">{{ firstName }} {{ lastName }} </template>
    </base-combo-box>

    <base-input type="text" id="document" name="document" placeholder="CPF" />

    <base-date-picker-input class="w-full" name="dates" />
    <slot />
  </form>
</template>

<script setup lang="ts">
import { useForm, type GenericObject } from 'vee-validate'
import BaseInput from '@/components/BaseInput.vue'
import BaseComboBox from './ClientComboBox.vue'
import BaseDatePickerInput from '@/components/BaseDatePickerInput.vue'

import { useMovieFormController } from './useMovieFormController'
import { watch } from 'vue'

type tEmit = {
  (e: 'submit', v: GenericObject): void
}

type tProps = {
  showConfirmPassword?: boolean
  initialValues?: {
    name?: string
    clientName?: string
    document?: string
    dates?: string[]
  }
}

const props = withDefaults(defineProps<tProps>(), {
  showConfirmPassword: true
})
const emit = defineEmits<tEmit>()

const { schema, clients } = useMovieFormController()

const getDate = () => {
  const startDate = new Date()
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
  return [startDate, endDate]
}

const { values, setFieldValue, handleSubmit } = useForm({
  initialValues: {
    ...props.initialValues,
    dates: getDate()
  },
  validationSchema: schema
})

const onSubmit = handleSubmit((values) => emit('submit', values))

watch(
  () => values,
  (v) => {
    setFieldValue('document', v!.client?.document)
  },
  { deep: true }
)
</script>
