<template>
  <BaseTable.Root :is-loading :list :not-found-description>
    <template #header>
      <BaseTable.Header>
        <span class="block w-1/3 text-center md:text-start">Titulo</span>
        <span class="block w-1/3 text-center">Data de lançamento</span>
        <span class="block w-1/3 text-center">Id no IMDB</span>
      </BaseTable.Header>
    </template>

    <template #default="props: iMovie">
      <BaseTable.Cell @click="$emit('selectMovie', props)">
        <div class="w-1/3">
          <span class="text-gray-700 text-base block text-ellipsis overflow-hidden">
            {{ props.Title }}
          </span>
        </div>
        <div class="w-1/3">
          <span class="text-center text-gray-700 text-base block">
            {{ props.Year }}
          </span>
        </div>
        <div class="w-1/3 flex justify-end md:block">
          <span class="text-center text-gray-700 text-base block"> {{ props.imdbID }} </span>
        </div>
      </BaseTable.Cell>
    </template>
  </BaseTable.Root>
</template>

<script setup lang="ts">
import BaseTable from '@/components/BaseTable/BaseTable'
import type { iMovie } from '@/app/services/MovieService'

defineProps<{ list?: any[]; isLoading: boolean; notFoundDescription?: string }>()
defineEmits<{ selectMovie: [v: iMovie] }>()
</script>

<style scoped></style>
