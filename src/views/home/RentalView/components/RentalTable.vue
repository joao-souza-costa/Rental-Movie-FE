<template>
  <BaseTable.Root
    :is-loading
    :list
    not-found-description="Não encontramos nenhum registro de locação"
  >
    <template #header>
      <BaseTable.Header>
        <span class="md:w-1/5 w-1/2 px-2">Filme</span>
        <span class="md:w-1/5 w-1/2 px-2 text-center md:text-start">Cliente</span>
        <span class="w-1/5 px-2 text-right hidden md:text-start">Data de locação</span>
        <span class="w-1/5 px-2 text-right hidden md:text-start">Data de entrega</span>
        <span class="w-1/5 px-2 text-right md:block md:text-start hidden">Status</span>
      </BaseTable.Header>
    </template>

    <template #default="props: iRental">
      <BaseTable.Cell @click="$emit('selectRental', props)">
        <div class="md:w-1/5 w-1/2 px-2">
          <p class="text-gray-700 text-base block truncate">
            {{ props.name }}
          </p>
        </div>
        <div class="md:w-1/5 w-1/2 px-2 text-center md:text-start">
          <span class="text-gray-700 text-base block">
            {{ props.clientName }}
          </span>
        </div>
        <div class="w-1/5 px-2 flex justify-end hidden md:block">
          {{ formatDate(props.startDate) }}
        </div>
        <div class="w-1/5 px-2 flex justify-end hidden md:block">
          {{ formatDate(props.deliveryDate) }}
        </div>
        <div class="w-1/5 px-2 flex justify-end hidden md:block">
          {{ STATUS_RENTAL_LABELS[props.status] }}
        </div>
      </BaseTable.Cell>
    </template>
  </BaseTable.Root>
</template>

<script setup lang="ts">
import { STATUS_RENTAL_LABELS, type iRental } from '@/app/services/RentalService'
import { formatDate } from '@/app/utils/formatDate'
import BaseTable from '@/components/BaseTable/BaseTable'

defineProps<{ list?: iRental[]; isLoading: boolean }>()
defineEmits<{
  selectRental: [v: iRental]
}>()
</script>

<style scoped></style>
