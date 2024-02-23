import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/ƒ
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env)
  return {
    base: '/locadora-test/',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      hmr: env.VITE_BUILD_MODE === 'build' ? { host: '0.0.0.0', port: 5173 } : {}
    }
  }
})
