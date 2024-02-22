<template>
  <base-modal
    class="max-w-[500px]"
    v-if="isOpen"
    title="Mudar status"
    open
    @update:open="$emit('close')"
  >
    <rental-form @submit="onSubmit" :rental="rental">
      <base-button class="w-full" type="submit"> Salvar </base-button>
    </rental-form>
  </base-modal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue'
import RentalForm from '../components/RentalForm.vue'
import BaseButton from '@/components/BaseButton.vue'
import { enumRentalStatus, type iRental } from '@/app/services/ClientService'
import { useClientStore } from '@/app/store/useClientStore'
import { toast } from '@/app/utils/toast'

const props = defineProps<{ isOpen: boolean; rental: iRental }>()
const emit = defineEmits<{ close: [] }>()
const clientStore = useClientStore()

const onSubmit = (status: enumRentalStatus) => {
  clientStore
    .updateRentalStatus({ status, clientId: props.rental.clientId, rentalId: props.rental.id })
    .then(() => toast.success('Filme entregue com sucesso!'))
    .then(() => emit('close'))
    .catch((e) => toast.error(e.message || 'Erro ao entregar filter'))
}
</script>

<style scoped></style>
