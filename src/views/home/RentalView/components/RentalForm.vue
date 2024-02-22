<template>
  <Form
    @submit="(v) => $emit('submit', v.status)"
    :initial-values="{ ...rental, dates }"
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

    <base-date-picker-input
      label="Data de alocação - Data de entrega"
      disabled
      class="w-full"
      name="dates"
      range
    />

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
import { STATUS_RENTAL_LABELS, enumRentalStatus, type iRental } from '@/app/services/RentalService'
import { computed } from 'vue'

type tEmit = {
  (e: 'submit', v: enumRentalStatus): void
}

type tProps = {
  rental: iRental
}

const options = [
  {
    value: enumRentalStatus.CLOSED,
    label: STATUS_RENTAL_LABELS.CLOSED
  },
  {
    value: enumRentalStatus.RENTED,
    label: STATUS_RENTAL_LABELS.RENTED
  }
]

const props = defineProps<tProps>()
defineEmits<tEmit>()

const dates = computed<string[]>(() => {
  return [props.rental.startDate, props.rental.deliveryDate]
})
</script>
