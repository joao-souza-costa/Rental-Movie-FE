<template>
  <Form
    @submit="(v) => $emit('submit', v as Omit<iUser, 'id'| 'expiredIn'>)"
    :validation-schema="schema"
    class="mt-5 flex flex-col items-center gap-4"
  >
    <base-input
      :initial-value="initialValues?.name"
      type="text"
      id="name"
      name="name"
      placeholder="Nome"
    />

    <base-input
      :initial-value="initialValues?.email"
      type="text"
      id="email"
      name="email"
      placeholder="Email"
    />

    <base-input
      :initial-value="initialValues?.document"
      name="document"
      type="string"
      id="document"
      placeholder="CPF"
    />
    <base-input
      :initial-value="initialValues?.password"
      type="password"
      id="password"
      name="password"
      placeholder="Senha"
    />

    <base-input
      v-show="showConfirmPassword"
      :initial-value="initialValues?.password"
      type="password"
      id="password"
      name="confirmPassword"
      placeholder="Confirmar senha"
    />

    <slot name="status-field"> </slot>

    <slot />
  </Form>
</template>

<script setup lang="ts">
import { type iUser } from '@/app/services/UserService'
import { Form } from 'vee-validate'
import BaseInput from '@/components/BaseInput.vue'
import { useUserFormController } from './useUserFormController'

type tEmit = {
  (e: 'submit', v: Omit<iUser, 'id'| 'expiredIn'>): void
}

type tProps = {
  showConfirmPassword?: boolean
  initialValues?: iUser
}

withDefaults(defineProps<tProps>(), {
  showConfirmPassword: true
})
defineEmits<tEmit>()

const { schema } = useUserFormController()
</script>
