import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@fortawesome/vue-fontawesome']
    }
  },
  plugins: [
    vue({
      template: { transformAssetUrls }
}),

quasar({
  sassVariables: 'src/quasar-variables.sass'
})
],
resolve: {
alias: {
  '@': fileURLToPath(new URL('./src', import.meta.url)),
},
},
});