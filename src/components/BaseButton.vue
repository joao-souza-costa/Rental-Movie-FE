<template>
  <button
    :disabled="disabled || isLoading"
    class="disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 px-6 h-12 rounded-2xl font-medium transition-all flex items-center justify-center"
    :class="buttonVariant[variant]"
  >
    <base-spinner class="w-6 h-6" v-if="isLoading" />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import BaseSpinner from './BaseSpinner.vue'

enum buttonVariant {
  PRIMARY = 'bg-teal-900 hover:bg-teal-800 text-white ',
  DANGER = 'bg-red-900 hover:bg-red-800 text-white ',
  GHOST = 'bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/5'
}

type iProps = {
  isLoading?: boolean
  disabled?: boolean
  variant?: 'PRIMARY' | 'DANGER' | 'GHOST'
}

withDefaults(defineProps<iProps>(), {
  variant: 'PRIMARY'
})
</script>

<style scoped></style>
