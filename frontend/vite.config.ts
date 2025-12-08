import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/pwa-icon.png'],
      manifest: {
        name: 'YouTube Controller Free',
        short_name: 'YTC Free',
        start_url: '/',
        display: 'standalone',
        background_color: '#0b1221',
        theme_color: '#0b1221',
        icons: [
          {
            src: '/icons/pwa-icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
