<template>
  <Form
    @submit="(v) => $emit('submit', v.status)"
    :initial-values="{ ...rent, dates }"
    class="mt-5 flex flex-col items-center gap-4"
  >
    <base-input class="w-full" name="name" disabled type="text" id="status" placeholder="Nome" />

    <base-input
      class="w-full"
      name="clientName"
      disabled
      type="text"
      id="status"
      placeholder="Nome do cliente"
    />

    <base-input
      class="w-full"
      name="user"
      disabled
      type="text"
      id="status"
      placeholder="Usuário responsável"
    />

    <base-date-picker-input disabled class="w-full" name="dates" />

    <base-input-select
      class="w-full"
      :options="options"
      type="text"
      id="status"
      name="status"
      placeholder="Status"
    />
    <slot />
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import BaseInputSelect from '@/components/BaseInputSelect.vue'
import BaseDatePickerInput from '@/components/BaseDatePickerInput.vue'
import BaseInput from '@/components/BaseInput.vue'
import { STATUS_RENT_LABELS, enumRentStatus, type iRent } from '@/app/services/ClientService'
import { computed } from 'vue'

type tEmit = {
  (e: 'submit', v: enumRentStatus): void
}

type tProps = {
  rent: iRent
}

const options = [
  {
    value: enumRentStatus.CLOSED,
    label: STATUS_RENT_LABELS.CLOSED
  },
  {
    value: enumRentStatus.RENTED,
    label: STATUS_RENT_LABELS.RENTED
  }
]

const props = defineProps<tProps>()
defineEmits<tEmit>()

const dates = computed<string[]>(() => {
  return [props.rent.startDate, props.rent.deliveryDate]
})
</script>
