<template>
  <base-modal
    class="max-w-[500px]"
    v-if="isOpen"
    title="Editar cliente"
    open
    @update:open="$emit('close')"
  >
    <client-form @submit="onSubmit" :initial-values="client">
      <template #statusField>
        <base-input-select
          class="flex flex-[1]"
          :initial-value="statusValue"
          :options="options"
          name="status"
          id="status"
          placeholder="Status"
          @change="(v) => (statusValue = v as enumClientStatus)"
        />
      </template>

      <div>
        <base-button class="w-full" type="submit"> Salvar </base-button>
      </div>
    </client-form>
  </base-modal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue'
import ClientForm from '../components/ClientForm.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInputSelect from '@/components/BaseInputSelect.vue'

import { useClientStore } from '@/app/store/useClientStore'
import { toast } from '@/app/utils/toast'
import { enumClientStatus, type iClient } from '@/app/services/ClientService'
import { ref } from 'vue'

const props = defineProps<{ isOpen: boolean; client?: iClient }>()
const emit = defineEmits<{ close: [] }>()
const clientStore = useClientStore()

const statusValue = ref(props.client?.status)
const options = [
  {
    value: enumClientStatus.ACTIVE,
    label: 'Ativo'
  },
  {
    value: enumClientStatus.INACTIVE,
    label: 'Inativo'
  }
]

const onSubmit = (v: any) => {
  clientStore
    .updateClient(props.client!.id, { ...v, status: statusValue.value })
    .then(() => toast.success('Cliente Editado com sucesso!'))
    .then(() => emit('close'))
    .catch((e) => toast.error(e || 'Erro ao editar cliente'))
}
</script>

<style scoped></style>
