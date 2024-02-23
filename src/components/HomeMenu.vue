<template>
  <div class="p-5 flex justify-start flex-row flex-wrap md:flex-col md:flex-nowrap gap-3">
    <div
      class="min-h-[40x] outline-none flex items-center py-2 px-3 text-gray-800 text-base hover:bg-gray-100 rounded-2xl transition-colors cursor-pointer disabled:opacity-75 disabled:text-opacity-20 disabled:cursor-not-allowed"
      :class="[$route.name === RENTAL_PAGE.name && '!bg-gray-100']"
    >
      <router-link :to="RENTAL_PAGE" class="w-full md:text-start text-center md:pl-4">
        Locações
      </router-link>
    </div>
    <div
      class="min-h-[40x] outline-none flex items-center py-2 px-3 text-gray-800 text-base hover:bg-gray-100 rounded-2xl transition-colors cursor-pointer disabled:opacity-75 disabled:text-opacity-20 disabled:cursor-not-allowed"
      :class="[$route.name === MOVIE_PAGE.name && '!bg-gray-100']"
    >
      <router-link :to="MOVIE_PAGE" class="w-full md:text-start text-center md:pl-4">
        Filmes
      </router-link>
    </div>
    <div
      class="min-h-[40x] outline-none flex items-center py-2 px-3 text-gray-800 text-base hover:bg-gray-100 rounded-2xl transition-colors cursor-pointer disabled:opacity-75 disabled:text-opacity-20 disabled:cursor-not-allowed"
      :class="[$route.name === USER_PAGE.name && '!bg-gray-100']"
    >
      <router-link :to="USER_PAGE" class="w-full md:text-start text-center md:pl-4">
        Usuários
      </router-link>
    </div>
    <div
      class="min-h-[40x] outline-none flex items-center py-2 px-3 text-gray-800 text-base hover:bg-gray-100 rounded-2xl transition-colors cursor-pointer disabled:opacity-75 disabled:text-opacity-20 disabled:cursor-not-allowed"
      :class="[$route.name === CLIENT_PAGE.name && '!bg-gray-100']"
    >
      <router-link :to="CLIENT_PAGE" class="w-full md:text-start text-center md:pl-4">
        Clientes
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RENTAL_PAGE, MOVIE_PAGE, CLIENT_PAGE, USER_PAGE } from '@/app/constants/route'
</script>

<style scoped></style>
