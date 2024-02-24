<template>
  <BaseDropdown.Root>
    <BaseDropdown.Trigger>
      <div
        class="bg-teal-0 rounded-full w-12 h-12 flex items-center justify-center border-teal-100 cursor-pointer"
      >
        <span class="text-sm font-medium text-teal-900 tracking-[-0.5px]">{{ name }}</span>
      </div>
    </BaseDropdown.Trigger>

    <BaseDropdown.Content class="w-32">
      <BaseDropdown.Item class="flex items-center justify-between" @select="handleSignout">
        Sair
        <ExitIcon class="w-4 h-4" />
      </BaseDropdown.Item>
    </BaseDropdown.Content>
  </BaseDropdown.Root>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/app/store/useAuthStore'
import BaseDropdown from './Dropdown/BaseDropdown'
import ExitIcon from '@/assets/icons/ExitIcon.vue'
import { computed } from 'vue'

const authStore = useAuthStore()

const handleSignout = () => {
  authStore.signout()
}

const name = computed(() => {
  if (!authStore.user) return ''

  const [firstName, secondName] = authStore.user!.name.split(' ')
  const value = secondName
    ? firstName.charAt(0).concat(secondName.charAt(0))
    : firstName.slice(0, 2)

  return value.toUpperCase()
})
</script>
