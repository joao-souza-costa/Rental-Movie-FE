<template>
  <div class="flex h-screen flex-col">
    <header class="flex flex-row items-center justify-end p-5 pb-0">
      <user-menu />
    </header>
    <section class="h-[95%] w-full flex md:flex-row flex-col">
      <div class="md:w-1/4 w-full">
        <home-menu />
      </div>
      <div class="md:w-3/4 w-full">
        <RouterView />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import HomeMenu from '@/components/HomeMenu.vue'
import UserMenu from '@/components/UserMenu.vue'
</script>
