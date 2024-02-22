<template>
  <base-modal
    class="max-w-[500px]"
    v-if="isOpen"
    title="Editar usuário"
    open
    @update:open="$emit('close')"
  >
    <user-form :show-confirm-password="false" @submit="onSubmit" :initial-values="user">
      <template #status-field>
        <base-input-select
          class="w-full"
          :initial-value="user?.status"
          :options="options"
          name="status"
          id="status"
          placeholder="Status"
          @change="(v) => (statusValue = v as enumUserStatus)"
        />
      </template>

      <div class="w-full">
        <base-button class="w-full" type="submit"> Salvar </base-button>
      </div>
    </user-form>
  </base-modal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue'
import UserForm from '../components/UserForm.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInputSelect from '@/components/BaseInputSelect.vue'

import { useUserStore } from '@/app/store/useUserStore'
import { toast } from '@/app/utils/toast'
import { type iUser, enumUserStatus } from '@/app/services/UserService'
import { ref } from 'vue'

const props = defineProps<{ isOpen: boolean; user?: iUser }>()
const emit = defineEmits<{ close: [] }>()
const userStore = useUserStore()

const statusValue = ref<enumUserStatus>()
const options = [
  {
    value: enumUserStatus.ACTIVE,
    label: 'Ativo'
  },
  {
    value: enumUserStatus.INACTIVE,
    label: 'Inativo'
  }
]

const onSubmit = (v: any) => {
  userStore
    .updateUser(props.user!.id, { ...v, status: statusValue.value })
    .then(() => toast.success('Usuário Editado com sucesso!'))
    .then(() => emit('close'))
    .catch((e) => toast.error(e.message|| 'Erro ao editar usuário'))
}
</script>

<style scoped></style>
