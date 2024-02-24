<template>
  <div class="p-5 flex justify-start flex-row flex-wrap md:flex-col md:flex-nowrap gap-3">
    <div v-for="page in pages" :key="page.name"
      class="min-h-[40x] outline-none flex items-center py-2 px-3 text-gray-800 text-base hover:bg-gray-100 rounded-2xl transition-colors cursor-pointer disabled:opacity-75 disabled:text-opacity-20 disabled:cursor-not-allowed"
      :class="[$route.name === page.name && '!bg-gray-100']"
    >
      <router-link :to="page" class="w-full md:text-start text-center md:pl-4">
        {{ page.label }}
      </router-link>
    </div>
</div>
</template>

<script setup lang="ts">
import { RENTAL_PAGE, MOVIE_PAGE, CLIENT_PAGE, USER_PAGE } from '@/app/constants/route'

const pages = [
  {
    ...RENTAL_PAGE,
    label: 'Locações'
  },
  {
    ...MOVIE_PAGE,
    label: 'Filmes'
  },
  {
    ...CLIENT_PAGE,
    label: 'Clientes'
  },
  {
    ...USER_PAGE,
    label: 'Usuários'
  },
]
</script>

<style scoped></style>
