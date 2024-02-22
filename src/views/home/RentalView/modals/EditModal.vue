<template>
  <base-modal
    class="max-w-[500px]"
    v-if="isOpen"
    title="Mudar status"
    open
    @update:open="$emit('close')"
  >
    <rental-form @submit="onSubmit" :rent="rent">
      <base-button class="w-full" type="submit"> Salvar </base-button>
    </rental-form>
  </base-modal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue'
import RentalForm from '../components/RentalForm.vue'
import BaseButton from '@/components/BaseButton.vue'
import { enumRentStatus, type iRent } from '@/app/services/ClientService'
import { useClientStore } from '@/app/store/useClientStore'
import { toast } from '@/app/utils/toast'

const props = defineProps<{ isOpen: boolean; rent: iRent }>()
const emit = defineEmits<{ close: [] }>()
const clientStore = useClientStore()

const onSubmit = (status: enumRentStatus) => {
  clientStore
    .updateRentStatus({ status, clientId: props.rent.clientId, rentId: props.rent.id })
    .then(() => toast.success('Filme entregue com sucesso!'))
    .then(() => emit('close'))
    .catch((e) => toast.error(e.message || 'Erro ao entregar filter'))
}
</script>

<style scoped></style>
