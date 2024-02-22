<template>
  <base-modal
    class="max-w-[500px]"
    v-if="isOpen"
    title="Adiciona cliente"
    open
    @update:open="$emit('close')"
  >
    <client-form @submit="onSubmit">
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
import { useClientStore } from '@/app/store/useClientStore'
import { toast } from '@/app/utils/toast'

defineProps<{ isOpen: boolean; client?: {} }>()
const emit = defineEmits<{ close: []}>()
const clientStore = useClientStore()

const onSubmit = (v: any) => {
  clientStore
    .createClient(v)
    .then(() => toast.success('Cliente criado com sucesso!'))
    .then(() => emit('close'))
    .catch((e) => toast.error(e.message|| 'Erro ao criar cliente'))
}
</script>

<style scoped></style>
