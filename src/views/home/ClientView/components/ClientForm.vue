<template>
  <form @submit="onSubmit">
    <div class="mt-4 flex flex-col gap-4 overflow-auto max-h-[600px] pr-2 scrollbar mb-5">
      <div class="flex flex-col gap-4">
        <span>Dados pessoais</span>

        <base-input
          :initial-value="initialValues?.firstName"
          name="firstName"
          type="text"
          id="firstName"
          placeholder="Nome"
        />

        <base-input
          :initial-value="initialValues?.lastName"
          name="lastName"
          type="text"
          id="lastName"
          placeholder="Sobrenome"
        />

        <base-input
          :initial-value="initialValues?.document"
          name="document"
          type="string"
          id="document"
          placeholder="CPF"
        />

        <slot name="statusField" />

        
      </div>

      <div class="flex flex-col gap-4">
        <span>Contatos</span>

        <base-input
          :initial-value="initialValues?.email"
          name="email"
          type="email"
          id="email"
          placeholder="Email"
        />

        <base-input
          :initial-value="initialValues?.cellphone"
          name="cellphone"
          type="tel"
          id="cellphone"
          placeholder="Celular"
        />
      </div>

      <div class="flex flex-col gap-4">
        <span>Endereço</span>

        <div class="relative">
          <base-input
            name="cep"
            :initial-value="initialValues?.cep"
            type="string"
            id="cep"
            placeholder="CEP"
          />

          <base-spinner v-if="isLoading || isRefetching" class="!w-6 !h-6 absolute top-4 right-1" />
        </div>

        <div class="flex flex-row gap-4">
          <base-input
            name="street"
            :initial-value="address?.logradouro"
            :disabled="isLoading || isRefetching"
            type="text"
            id="street"
            placeholder="Logradouro"
          />

          <base-input
            name="neighborhood"
            :initial-value="address?.bairro"
            :disabled="isLoading || isRefetching"
            type="text"
            id="neighborhood"
            placeholder="Bairro"
          />
        </div>

        <div class="flex flex-row gap-4">
          <base-input
            name="city"
            :initial-value="address?.localidade"
            :disabled="isLoading || isRefetching"
            type="text"
            id="city"
            placeholder="Cidade"
          />

          <base-input
            name="state"
            :initial-value="address?.uf"
            :disabled="isLoading || isRefetching"
            type="text"
            id="state"
            placeholder="UF"
          />
        </div>
      </div>
    </div>
    <slot />
  </form>
</template>

<script setup lang="ts">
import { type iClient } from '@/app/services/ClientService'
import { type GenericObject } from 'vee-validate'
import BaseInput from '@/components/BaseInput.vue'
import { useClientFormController } from './useClientFormController'
import BaseSpinner from '@/components/BaseSpinner.vue'

type tEmit = {
  (e: 'submit', v: GenericObject): void
}

type tProps = {
  initialValues?: iClient
}

const props = defineProps<tProps>()

const emit = defineEmits<tEmit>()

const { handleSubmit, address, isLoading, isRefetching } = useClientFormController()

const onSubmit = handleSubmit((v) => emit('submit', v))

</script>
