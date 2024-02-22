<template>
  <DialogRoot v-model:open="openModal">
    <DialogPortal>
      <DialogOverlay
        class="data-[state=open]:animate-overlay-show fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      />
      <DialogContent
        aria-describedby="undefined"
        class="data-[state=open]:animate-content-show fixed top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px] outline-none"
        :class="$attrs.class"
      >
        <div aria-describedby="undefined">
          <header class="h-12 flex items-center justify-between text-gray-800">
            <button
              @click="$emit('update:open', false)"
              class="w-12 h-12 flex items-center justify-center outline-none"
            >
              <cross-circle class="w-6 h-6" />
            </button>
            <DialogTitle class="text-lg font-bold tracking-[-1px]">{{ title }}</DialogTitle>
            <div class="w-12 h-12 flex items-center justify-center">
              <slot name="right-action" />
            </div>
          </header>
          <div>
            <slot />
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CrossCircle from '@/assets/icons/CrossCircle.vue'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'radix-vue'

defineOptions({
  inheritAttrs: false
})

type iProps = {
  title: String
  open: Boolean
}
type iEmit = {
  (e: 'update:open', v: boolean): void
  (e: 'unmount'): void
}

const props = defineProps<iProps>()
const emit = defineEmits<iEmit>()

const openModal = computed({
  get() {
    return props.open as boolean
  },
  set(nv: boolean) {
    emit('update:open', nv)
  }
})
</script>
