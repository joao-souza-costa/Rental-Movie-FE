<template>
  <BaseTable.Root :is-loading :list :not-found-description>
    <template #header>
      <BaseTable.Header>
        <span class="block w-1/3 text-center md:text-start">Nome</span>
        <span class="block w-1/3 text-center">Documento</span>
        <span class="block w-1/3 text-center">Status</span>
      </BaseTable.Header>
    </template>

    <template #default="props: iUser">
      <BaseTable.Cell data-test-id="table-cell" @click="$emit('selectedUser', props)">
        <div class="w-1/3">
          <span class="text-gray-700 text-base block text-ellipsis overflow-hidden">
            {{ props.name }}
          </span>
        </div>
        <div class="w-1/3">
          <span class="text-center text-gray-700 text-base block">
            {{ props.document }}
          </span>
        </div>
        <div class="w-1/3 flex justify-end md:block">
          <span class="text-center text-gray-700 text-base block">
            {{ STATUS_LABELS[props.status] }}
          </span>
        </div>
      </BaseTable.Cell>
    </template>
  </BaseTable.Root>
</template>

<script setup lang="ts">
import { STATUS_LABELS, type iUser } from '@/app/services/UserService'
import BaseTable from '@/components/BaseTable/BaseTable'

defineProps<{ list?: iUser[] | null; isLoading: boolean; notFoundDescription?: string }>()
defineEmits<{ selectedUser: [v: iUser] }>()
</script>

<style scoped></style>
