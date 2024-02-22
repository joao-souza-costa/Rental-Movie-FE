import './assets/main.css'
import "vue-toastification/dist/index.css";

import App from './App.vue'

import { createApp } from 'vue/dist/vue.esm-bundler'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Toast from 'vue-toastification'

import router from './router'
import type { provideToast } from 'vue-toastification'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false
      }
    }
  }
})
app.use(Toast)
app.mount('#app')
