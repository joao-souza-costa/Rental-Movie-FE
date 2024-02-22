<template>
  <div v-if="errorMessage" class="flex gap-1 items-center mt-2 text-red-900">
    <CrossCircle />
    <span class="text-xs"> {{ errorMessage }} </span>
  </div>
</template>

<script setup lang="ts">
import CrossCircle from '@/assets/icons/CrossCircle.vue'

type tProps = {
  errorMessage?: string
}

defineProps<tProps>()
</script>

<style scoped></style>
