<template>
  <Form
    @submit="(v) => $emit('submit', v)"
    :initial-values="{ status }"
    class="mt-5 flex flex-col items-center gap-4"
  >
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
import { Form, type GenericObject } from 'vee-validate'
import BaseInputSelect from '@/components/BaseInputSelect.vue'
import { STATUS_RENT_LABELS, enumRentStatus } from '@/app/services/ClientService'

type tEmit = {
  (e: 'submit', v: GenericObject): void
}

type tProps = {
  status: enumRentStatus
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

defineProps<tProps>()

defineEmits<tEmit>()
</script>
