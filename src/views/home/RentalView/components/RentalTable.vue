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

    <template
      #default="props: {
        name: string
        clientName: string
        startDate: string
        deliveryDate: string
        status: enumRentStatus
        user: iClient
      }"
    >
      <BaseTable.Cell>
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
          {{ props.startDate }}
        </div>
        <div class="w-1/5 flex justify-end md:block">
          {{ props.deliveryDate }}
        </div>
        <div class="w-1/5 flex justify-end md:block">
          {{ STATUS_RENT_LABELS[props.status] }}
        </div>
      </BaseTable.Cell>
    </template>
  </BaseTable.Root>
</template>

<script setup lang="ts">
import { STATUS_RENT_LABELS, enumRentStatus, type iClient } from '@/app/services/ClientService'
import BaseTable from '@/components/BaseTable/BaseTable'

defineProps<{ list: any[]; isLoading: boolean }>()
</script>

<style scoped></style>
