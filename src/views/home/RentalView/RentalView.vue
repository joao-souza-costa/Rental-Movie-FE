<template>
  <section class="p-5 h-5/6">
    <div class="mb-5">
      <div class="flex items-center justify-between">
        <p class="text-3xl font-bold">Locações</p>
        <base-button @click="openMoviesPage" variant="PRIMARY"> Adicionar </base-button>
      </div>
      <p class="mt-5 text-1xl font-normal relative">
        Nesta página você vai poder gerenciar as suas locações
      </p>

      <form class="mb-3 mt-3 flex flex-row gap-3">
        <base-input type="text" id="clientName" name="clientName" placeholder="Client" />

        <base-date-picker-input class="w-full" name="dates" />
      </form>
    </div>

    <rental-table :list="data" :is-loading="false" />
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { useRentalController } from './useRentalController'
import RentalTable from './components/RentalTable.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseDatePickerInput from '@/components/BaseDatePickerInput.vue'

const { data, openMoviesPage } = useRentalController()
</script>

<style scoped></style>
