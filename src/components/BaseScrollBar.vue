<template>
  <ScrollAreaRoot
    class="w-full h-full"
    style="--scrollbar-size: 10px"
    type="auto"
  >
    <ScrollAreaViewport class="w-full h-full rounded"> <slot /> </ScrollAreaViewport>
    <ScrollAreaScrollbar
      class="flex select-none touch-none p-0.5 bg-gray-100 rounded transition-colors duration-[160ms] ease-out hover:bg-gray-200 data-[orientation=vertical]:w-3 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="vertical"
    >
      <ScrollAreaThumb
        class="flex-1 bg-teal-800 rounded cursor-pointer relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
      />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>

<script setup lang="ts">
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'radix-vue'
</script>