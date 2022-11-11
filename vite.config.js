import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    // https://vite-pwa-org.netlify.app/
    VitePWA({ registerType: 'autoUpdate' }),
  ]
})
