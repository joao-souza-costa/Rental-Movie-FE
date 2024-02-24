import { mount } from '@vue/test-utils'
import { VueQueryPlugin } from '@tanstack/vue-query'
export const useMountComponent = (component: any, params?: Record<string, any>) =>
  mount(component, {
    ...params,
    global: {
      ...params?.global,
      plugins: [VueQueryPlugin]
    }
  })
