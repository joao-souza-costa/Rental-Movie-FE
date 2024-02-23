<template>
  <section class="p-5">
    <div class="mb-5">
      <div class="flex items-center justify-between">
        <p class="text-3xl font-bold">Usuários</p>
      </div>
      <p class="text-1xl font-normal relative flex flex-row justify-between items-center">
        <span>Nesta página você vai poder gerenciar os usuários da aplicação </span>
        <base-button @click="toggleModal('CREATE')">Adicionar</base-button>
      </p>
    </div>

    <user-table
      :list="users"
      :is-loading="isLoading || isRefetching"
      not-found-description="Não encontramos nenhum usuário na nossa base de dados"
      @selected-user="(user: iUser) => toggleModal('EDIT', user)"
    />

    <create-modal :is-open="isOpenModal.CREATE" @close="toggleModal('CREATE')" />

    <edit-modal
      v-if="isOpenModal.EDIT_ITEM"
      :is-open="isOpenModal.EDIT"
      :user="isOpenModal.EDIT_ITEM"
      @close="toggleModal('EDIT')"
    />
  </section>
</template>

<script setup lang="ts">
import { useUserController } from './useUserController'
import UserTable from './components/UserTable.vue'
import BaseButton from '@/components/BaseButton.vue'
import CreateModal from './modals/CreateModal.vue'
import EditModal from './modals/EditModal.vue'
import { type iUser } from '@/app/services/UserService'

const { users, isOpenModal, isLoading, isRefetching, toggleModal } = useUserController()
</script>

<style scoped></style>
