<template>
  <div class="flex flex-row h-full">
    <section class="w-full h-full flex items-center justify-center flex-col gap-16">
      <div class="max-w-[504px] w-full px-8">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
#home-view {
  margin: 3.2rem;
}
</style>
