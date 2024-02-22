<template>
  <base-modal
    class="max-w-[500px]"
    v-if="isOpen"
    title="Adiciona Usuário"
    open
    @update:open="$emit('close')"
  >
    <div>
      <user-form @submit="onSubmit">
        <div class="w-full">
          <base-button class="w-full" type="submit" :is-loading="userStore.createLoading">
            Salvar
          </base-button>
        </div>
      </user-form>
    </div>
  </base-modal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue'
import UserForm from '../components/UserForm.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useUserStore } from '@/app/store/useUserStore'
import { toast } from '@/app/utils/toast'

defineProps<{ isOpen: boolean; client?: {} }>()
const emit = defineEmits<{ close: [] }>()
const userStore = useUserStore()

const onSubmit = (v: any) => {
  userStore
    .createUser(v)
    .then(() => toast.success('Usuário criado com sucesso!'))
    .then(() => emit('close'))
    .catch((e) => toast.error(e || 'Erro ao criar usuário'))
}
</script>

<style scoped></style>
