<template>
  <section class="p-5">
    <div class="mb-5">
      <div class="flex items-center justify-between">
        <p class="text-3xl font-bold">Clientes</p>
      </div>
      <p class="text-1xl font-normal relative flex flex-row justify-between items-center">
        <span>Nesta página você vai poder gerenciar os clientes </span>
        <base-button @click="toggleModal('CREATE')">Adicionar</base-button>
      </p>
    </div>

    <base-input
      :initial-value="filters?.name"
      class="mb-2"
      name="name"
      type="text"
      id="name"
      placeholder="Nome"
      @change="handleUpdateFirstName"
    />

    <div class="mb-3 flex flex-row gap-3">
      <base-input
        :initial-value="filters?.document"
        class="flex flex-[2]"
        name="document"
        type="number"
        id="document"
        placeholder="Documento"
        @change="handleUpdateDocument"
      />

      <base-input-select
        class="flex flex-[1]"
        :initial-value="filters?.status"
        :options
        name="status"
        id="status"
        placeholder="Status"
        @change="handleUpdateStatus"
      />
    </div>

    <client-table
      :list="clients"
      :is-loading="isLoading || isRefetching"
      not-found-description="Não encontramos nenhum cliente na nossa base de dados"
      @selected-client="(client: iClient) => toggleModal('EDIT', client)"
    />

    <create-modal :is-open="isOpenModal.CREATE" @close="toggleModal('CREATE')" />

    <edit-modal
      :is-open="isOpenModal.EDIT"
      :client="isOpenModal.EDIT_ITEM"
      @close="toggleModal('EDIT')"
    />
  </section>
</template>

<script setup lang="ts">
import { useClientController } from './useClientController'
import ClientTable from './components/ClientTable.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInputSelect from '@/components/BaseInputSelect.vue'
import CreateModal from './modals/CreateModal.vue'
import EditModal from './modals/EditModal.vue'
import { STATUS_LABELS, enumClientStatus, type iClient } from '@/app/services/ClientService'

const {
  isOpenModal,
  clients,
  isLoading,
  isRefetching,
  filters,
  toggleModal,
  handleUpdateDocument,
  handleUpdateFirstName,
  handleUpdateStatus
} = useClientController()

const options = [
  {
    value: enumClientStatus.ACTIVE,
    label: STATUS_LABELS.ACTIVE
  },
  {
    value: enumClientStatus.INACTIVE,
    label: STATUS_LABELS.INACTIVE
  },
  {
    value: enumClientStatus.ALL,
    label: STATUS_LABELS.ALL
  }
]
</script>

<style scoped></style>
