<template>
  <section class="p-5">
    <div class="mb-5">
      <div class="flex items-center justify-between">
        <p class="text-3xl font-bold">Filmes</p>
      </div>
      <p class="mt-5 text-1xl font-normal relative">
        Nesta página você pode escolher filmes para akugar
      </p>
    </div>

    <div class="mb-3 flex flex-row gap-3">
      <base-input
        class="flex flex-[2]"
        :initial-value="filters.title"
        name="title"
        type="text"
        id="title"
        placeholder="Titulo"
        @change="handleUpdateTitle"
      />
      <base-input
        class="flex flex-[1]"
        :initial-value="filters.year"
        name="year"
        type="number"
        id="year"
        placeholder="Ano"
        @change="handleUpdateYear"
      />
    </div>

    <movie-table
      :list="data"
      :is-loading="isLoading || isRefetching"
      :not-found-description="notFoundDescription"
      @select-movie="(v) => toggleModal('EDIT', v)"
    />

    <div class="w-full flex justify-center mt-5 items-center">
      <ChevronLeftIcon class="w-5 h-5 mr-3 cursor-pointer" @click="handleUpdatePage(-1)" />
      {{ filters.page }}
      <ChevronRightIcon
        class="w-5 h-5 ml-3 cursor-pointer"
        @click="data?.length && handleUpdatePage(+1)"
      />

      <create-rental-modal
        :is-open="isOpenModal.EDIT"
        :movie="isOpenModal.EDIT_ITEM"
        @close="toggleModal('EDIT')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMovieController } from './useMovieController'
import MovieTable from './components/MovielTable.vue'
import CreateRentalModal from './modals/CreateRentalModal.vue'
import BaseInput from '@/components/BaseInput.vue'
import { computed } from 'vue'
import ChevronLeftIcon from '@/assets/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/assets/icons/ChevronRightIcon.vue'

const {
  data,
  handleUpdatePage,
  handleUpdateTitle,
  handleUpdateYear,
  isOpenModal,
  toggleModal,
  isLoading,
  isRefetching,
  filters
} = useMovieController()

const notFoundDescription = computed(() => {
  return `Não encontramos nenhum filme com o titulo de: "${filters.value.title}" no ano de ${filters.value.year}`
})
</script>

<style scoped></style>
