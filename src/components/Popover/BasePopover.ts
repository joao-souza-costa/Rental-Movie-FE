import { defineComponent } from 'vue'

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
} from 'radix-vue'

const BasePopoverRoot = defineComponent({
  components: {
    PopoverRoot,
  },
  template: `
  <PopoverRoot>
    <slot/>
  </PopoverRoot>`
})
const BasePopoverTrigger = defineComponent({
  components: {
    PopoverTrigger
  },
  template: `
  <PopoverTrigger asChild>
    <slot />
  </PopoverTrigger>`
})
const BasePopoverContent = defineComponent({
  components: {
    PopoverPortal,
    PopoverContent,
  },
  template: `
  <PopoverPortal>
    <PopoverContent 
    :class="$attrs.class"
    class="data-[side=bottom]:animate-slide-up-and-fade 
    data-[side=top]:animate-slide-down-and-fade 
    rounded-2xl p-2 bg-white space-y-2 
    shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[100]"
    >
      <slot/>
    </PopoverContent>
  </PopoverPortal>
  `
})

export default {
  Root: BasePopoverRoot,
  Trigger: BasePopoverTrigger,
  Content: BasePopoverContent,
}
