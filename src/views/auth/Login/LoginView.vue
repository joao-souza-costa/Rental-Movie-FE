<template>
  <header class="flex flex-col items-center gap-4">
    <h1 class="text-2xl text-bold text-gray-900 tracking-[-1px]">Entre em sua conta</h1>
  </header>

  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    class="mt-[60px] flex flex-col items-center gap-4"
  >   
    <base-input type="text" id="email" name="email" placeholder="Email" />
    <base-input type="password" id="password" name="password" placeholder="Senha" />
    <base-button :is-loading="isLoading" type="submit" class="w-full mt-2"> Entrar </base-button>
  </Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

import { useLoginController } from './useLoginController'

const { schema, onSubmit, isLoading } = useLoginController()
</script>

<style scoped></style>
