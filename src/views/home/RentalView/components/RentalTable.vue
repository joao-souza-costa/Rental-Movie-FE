<template>
  <BaseTable.Root
    :is-loading
    :list
    not-found-description="Não encontramos nenhum registro de locação"
  >
    <template #header>
      <BaseTable.Header>
        <span class="w-1/5">Filme</span>
        <span class="w-1/5 text-center md:text-start">Cliente</span>
        <span class="w-1/5 text-right md:text-start">Data de locação</span>
        <span class="w-1/5 text-right md:text-start">Data de entrega</span>
        <span class="w-1/5 text-right md:text-start">Status</span>
      </BaseTable.Header>
    </template>

    <template #default="props: iRental">
      <BaseTable.Cell @click="$emit('selectRental', props)">
        <div class="w-1/5">
          <span class="text-gray-700 text-base block text-ellipsis overflow-hidden">
            {{ props.name }}
          </span>
        </div>
        <div class="w-1/5 text-center md:text-start">
          <span class="text-gray-700 text-base block">
            {{ props.clientName }}
          </span>
        </div>
        <div class="w-1/5 flex justify-end md:block">
          {{ formatDate(props.startDate) }}
        </div>
        <div class="w-1/5 flex justify-end md:block">
          {{ formatDate(props.deliveryDate) }}
        </div>
        <div class="w-1/5 flex justify-end md:block">
          {{ STATUS_RENTAL_LABELS[props.status] }}
        </div>
      </BaseTable.Cell>
    </template>
  </BaseTable.Root>
</template>

<script setup lang="ts">
import { STATUS_RENTAL_LABELS, type iRental } from '@/app/services/ClientService'
import { formatDate } from '@/app/utils/formatDate'
import BaseTable from '@/components/BaseTable/BaseTable'

defineProps<{ list: any[]; isLoading: boolean }>()
defineEmits<{
  selectRental: [v: iRental]
}>()
</script>

<style scoped></style>
